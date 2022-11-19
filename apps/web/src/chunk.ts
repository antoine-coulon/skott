import {
  combineLatest,
  concatMap,
  endWith,
  from,
  map,
  Observable,
  of,
  timer,
} from "rxjs";

function* makeChunksFromArray<T>(sourceArray: Array<T>, chunkSize = 50) {
  const arraySize = sourceArray.length;
  for (let i = 0; i < sourceArray.length; i += chunkSize) {
    if (i + chunkSize <= arraySize) {
      yield sourceArray.slice(i, i + chunkSize);
      continue;
    }
    yield sourceArray.slice(i, arraySize);
  }
}

export function makeChunkStream<T>(
  sourceArray: Array<T>,
  chunkSize: number,
  timeBetweenChunks: number
): Observable<"END_OF_STREAM" | T[]> {
  return from(makeChunksFromArray(sourceArray, chunkSize))
    .pipe(
      concatMap((chunk) =>
        combineLatest([of(chunk), timer(timeBetweenChunks)])
      ),
      map(([chunk]) => chunk)
    )
    .pipe(endWith("END_OF_STREAM" as const));
}
