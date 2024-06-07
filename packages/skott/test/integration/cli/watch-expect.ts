import child_process from "node:child_process";
import fs from "node:fs";

import { watchModeStatus } from "../../../src/rendering/watch-mode.js";

export function prepareFinalizer(entryPath: string) {
  return (done: () => void) => {
    fs.rm(entryPath, { recursive: true, force: true }, done);
  };
}

const noOpFinalizer = (done: () => void) => done();

function trackWatchModeChanges({
  skottCliProcess,
  doneFailure,
  actionThatShouldTriggerChanges: actionToTriggerChanges,
  finalizer,
  onChangesDetected
}: {
  skottCliProcess: child_process.ChildProcess;
  doneFailure: (e: Error) => void;
  actionThatShouldTriggerChanges: () => void;
  finalizer: (testCb: () => void) => void;
  onChangesDetected: () => void;
}) {
  skottCliProcess.stdout?.on("data", (cliBuffer) => {
    const cliOutput = cliBuffer.toString();

    if (cliOutput.includes(watchModeStatus.watching_for_changes)) {
      const fn = () => {
        try {
          actionToTriggerChanges();
        } catch {}
      };

      // trigger action when watch mode is active
      if (process.env.CI) {
        setTimeout(fn, 1_500);
      } else {
        fn();
      }
    }

    if (cliOutput.includes(watchModeStatus.changes_detected)) {
      finalizer(() => onChangesDetected());
    }
  });

  skottCliProcess.on("error", (e) => {
    finalizer(() => doneFailure(e));
  });

  skottCliProcess.on("exit", (code) => {
    if (code !== 0) {
      finalizer(() =>
        doneFailure(new Error(`Process exited with code ${code}`))
      );
    }
  });
}

export function expectChangesToBeDetected(props: {
  skottCliProcess: child_process.ChildProcess;
  doneSuccess: (value: any) => void;
  doneFailure: (e: Error) => void;
  actionThatShouldTriggerChanges: () => void;
  finalizer?: (testCb: () => void) => void;
}) {
  trackWatchModeChanges({
    onChangesDetected: () => {
      props.doneSuccess(undefined);
      props.skottCliProcess.kill();
    },
    finalizer: noOpFinalizer,
    ...props
  });
}

export function expectChangesNotToBeDetected(props: {
  skottCliProcess: child_process.ChildProcess;
  doneSuccess: (value: any) => void;
  doneFailure: (e: Error) => void;
  actionThatShouldTriggerChanges: () => void;
  finalizer?: (testCb: () => void) => void;
}) {
  trackWatchModeChanges({
    finalizer: noOpFinalizer,
    ...props,
    onChangesDetected: () => {
      props.doneFailure(new Error("A change was caught when it should not"));
      props.skottCliProcess.kill();
    },
    doneFailure: (e) => {
      // @ts-expect-error
      if (e.code?.includes("ABORT_ERR")) {
        /**
         * To verify that no changes were detected, we wait for the Abort Signal
         * to be aborted after a timeout that we consider long enough to settle
         * on the fact that no changes were detected.
         * In that specific context, receiving an ABORT_ERR is a sign that the
         * test was successful.
         */
        return props.doneSuccess(undefined);
      }

      return props.doneFailure(e);
    }
  });
}
