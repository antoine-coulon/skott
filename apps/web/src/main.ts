import "animate.css";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  from,
  fromEvent,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from "rxjs";
import { EMPTY_OBSERVER } from "rxjs/internal/Subscriber";
import { Edge, Node } from "vis-network";
import { makeChunkStream } from "./chunk";
import { fakeSkottData } from "./fake-data";
import {
  buildNetworkIncremental,
  edges,
  getMethodToApplyOnNetworkElement,
  isNetworkEdge,
  isNetworkNode,
  makeBuiltinDependencies,
  makeThirdPartyDependencies,
  network,
  nodes,
  toggleCircularDependencies,
} from "./network";
import { SkottStructureWithCycles } from "./skott";
import {
  isDevelopmentEnvironment,
  isJavaScriptModule,
  isTypeScriptModule,
} from "./util";

const domContentLoaded$ = fromEvent(document, "DOMContentLoaded");
const networkLoadingState$ = new BehaviorSubject("loading");

function blurOptions() {
  const options = document.querySelector(".skott-actions");
  options?.classList.add("blur-loading");
}

function unblurOptions() {
  const options = document.querySelector(".skott-actions");
  options?.classList.remove("blur-loading");
}

function initializeNetworkConstructionStateListeners() {
  network?.on("startStabilizing", function () {
    networkLoadingState$.next("loading");
  });

  network?.on("stabilizationProgress", function () {
    networkLoadingState$.next("loading");
  });

  network?.on("stabilizationIterationsDone", function () {
    networkLoadingState$.next("loaded");
  });

  network?.on("stabilized", function () {
    networkLoadingState$.next("loaded");
  });
}

function determineNetworkElementsToUpdate({
  action,
  enabled,
  data,
}: {
  action: string;
  enabled: boolean;
  data: SkottStructureWithCycles;
}): Observable<(Edge | Node)[]> {
  switch (action) {
    case "circular":
      return toggleCircularDependencies(enabled, data);
    case "builtin":
      return makeBuiltinDependencies(data);
    case "thirdparty":
      return makeThirdPartyDependencies(data);
    default:
      return from([]);
  }
}

function displayOptionGivenStats(option: string, stats: number) {
  if (stats > 0) {
    const optionElement = document.getElementById(option);
    optionElement?.classList.remove("hidden-by-default");
  }
}

function displaySkottStatistics(data: SkottStructureWithCycles) {
  const npmStats = document.getElementById("stats-npm")!;
  const nodeStats = document.getElementById("stats-node")!;
  const circularStats = document.getElementById("stats-circular")!;
  const fileStats = document.getElementById("stats-file")!;
  const tsStats = document.getElementById("stats-ts")!;
  const jsStats = document.getElementById("stats-js")!;

  const builtinRegistry = new Set();
  const npmRegistry = new Set();
  let numberOfTypeScriptFiles = 0;
  let numberOfJavaScriptFiles = 0;

  for (const node of Object.values(data.graph)) {
    if (isTypeScriptModule(node.id)) {
      numberOfTypeScriptFiles++;
    }

    if (isJavaScriptModule(node.id)) {
      numberOfJavaScriptFiles++;
    }

    node.body.thirdPartyDependencies.forEach((dep) => {
      npmRegistry.add(dep);
    });
    node.body.builtinDependencies.forEach((dep) => {
      builtinRegistry.add(dep);
    });
  }

  displayOptionGivenStats("circular-container", data.cycles.length);
  displayOptionGivenStats("third-party-container", npmRegistry.size);
  displayOptionGivenStats("builtin-container", builtinRegistry.size);

  npmStats.textContent = npmRegistry.size.toString();
  nodeStats.textContent = builtinRegistry.size.toString();
  circularStats.textContent = data.cycles.length.toString();
  fileStats.textContent = data.files.length.toString();
  tsStats.textContent = numberOfTypeScriptFiles.toString();
  jsStats.textContent = numberOfJavaScriptFiles.toString();
}

const dataStream$ = of(EMPTY).pipe(
  mergeMap(() => from(fetch("/api"))),
  mergeMap((value) => from(value.json())),
  catchError(() => of(isDevelopmentEnvironment() ? fakeSkottData : {})),
  tap(displaySkottStatistics),
  catchError(() => EMPTY)
);

const dataChunkedStream$ = combineLatest([dataStream$, domContentLoaded$]).pipe(
  concatMap(([data]) =>
    combineLatest([
      makeChunkStream(Object.values(data.graph), 50, 500),
      of({
        entrypoint: data.entrypoint,
      }),
    ])
  ),
  tap(([chunk, metadata]) => {
    if (Array.isArray(chunk)) {
      networkLoadingState$.next("loading");
      buildNetworkIncremental(chunk, metadata, () => {
        initializeNetworkConstructionStateListeners();
      });
    }
  })
);

function makeOptionStream() {
  const readyDataStream$ = combineLatest([dataStream$, domContentLoaded$]);
  const optionChangeStream$ = fromEvent(
    document.querySelectorAll("input[type=checkbox]"),
    "change"
  );

  return readyDataStream$
    .pipe(
      mergeMap(([data]) =>
        optionChangeStream$.pipe(
          debounceTime(250),
          // @ts-expect-error
          map((event) => `${event.target.id!}=${event.target.checked}`),
          distinctUntilChanged(),
          map((target) => {
            const [elementId, value] = target.split("=");
            const [_, action] = elementId.split("-");
            return { action, enabled: value === "true" ? true : false };
          }),
          tap(() => {
            networkLoadingState$.next("loading");
          }),
          concatMap((payload) => {
            const methodToApply = getMethodToApplyOnNetworkElement(
              payload.enabled
            );
            return determineNetworkElementsToUpdate({ ...payload, data }).pipe(
              concatMap((linkedNodeAndEdges) =>
                makeChunkStream(
                  linkedNodeAndEdges,
                  50,
                  // Removing is less expensive than adding/updating so we reduce debounce time
                  payload.enabled ? 300 : 50
                )
              ),
              tap((linkedNodeAndEdges) => {
                if (linkedNodeAndEdges === "END_OF_STREAM") {
                  return;
                }

                const linkedNodes = linkedNodeAndEdges.filter(isNetworkNode);
                const linkedEdges = linkedNodeAndEdges.filter(isNetworkEdge);

                nodes[methodToApply](linkedNodes);
                edges[methodToApply](linkedEdges);
              })
            );
          })
        )
      )
    )
    .pipe(
      debounceTime(500),
      tap(() => {
        network?.stabilize();
      })
    );
}

function registerCoreSubscribers() {
  networkLoadingState$.pipe(distinctUntilChanged()).subscribe((state) => {
    state === "loaded" ? unblurOptions() : blurOptions();
  });

  const optionStream$ = makeOptionStream();
  optionStream$.subscribe(EMPTY_OBSERVER);

  dataChunkedStream$.subscribe((value) => {
    if (typeof value === "string" && value === "END_OF_STREAM") {
      network?.stabilize();
    }
  });
}

registerCoreSubscribers();
