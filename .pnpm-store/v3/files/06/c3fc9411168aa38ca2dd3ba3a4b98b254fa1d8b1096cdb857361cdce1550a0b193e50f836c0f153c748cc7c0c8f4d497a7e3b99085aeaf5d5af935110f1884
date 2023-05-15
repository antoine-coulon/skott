"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runtimeDebug = exports.restoreOn = exports.restoreOff = void 0;
var _Global = /*#__PURE__*/require("@effect/data/Global");
/** @internal */
const restoreOn = body => function () {
  if (runtimeDebug.tracingEnabled) {
    // @ts-expect-error
    return body.apply(this, arguments);
  }
  runtimeDebug.tracingEnabled = true;
  try {
    // @ts-expect-error
    return body.apply(this, arguments);
  } finally {
    runtimeDebug.tracingEnabled = false;
  }
};
/** @internal */
exports.restoreOn = restoreOn;
const restoreOff = body => function () {
  if (!runtimeDebug.tracingEnabled) {
    // @ts-expect-error
    return body.apply(this, arguments);
  }
  runtimeDebug.tracingEnabled = false;
  try {
    // @ts-expect-error
    return body.apply(this, arguments);
  } finally {
    runtimeDebug.tracingEnabled = true;
  }
};
/** @internal */
exports.restoreOff = restoreOff;
const runtimeDebug = /*#__PURE__*/(0, _Global.globalValue)( /*#__PURE__*/Symbol.for("@effect/io/Debug/runtimeDebug"), () => ({
  minumumLogLevel: "Info",
  traceStackLimit: 5,
  tracingEnabled: true,
  parseStack: error => {
    const stack = error.stack;
    if (stack) {
      const lines = stack.split("\n");
      let starts = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("Error")) {
          starts = i;
        }
      }
      const frames = [];
      for (let i = starts + 1; i < lines.length; i++) {
        if (lines[i].includes("at")) {
          const blocks = lines[i].split(" ").filter(i => i.length > 0 && i !== "at");
          const name = blocks.length === 2 && !blocks[0].includes("<anonymous>") ? blocks[0] : undefined;
          const file = blocks.length === 2 ? blocks[1] : blocks[0];
          const matchFrame = file?.match(/\(?(.*):(\d+):(\d+)/);
          if (matchFrame) {
            frames.push({
              name,
              fileName: matchFrame[1],
              line: Number.parseInt(matchFrame[2]),
              column: Number.parseInt(matchFrame[3])
            });
          } else {
            frames.push(undefined);
          }
        } else {
          frames.push(undefined);
        }
      }
      return frames;
    }
    return [];
  },
  filterStackFrame: _ => _ != null && !_.fileName.match(/\/internal_effect_untraced/)
}));
exports.runtimeDebug = runtimeDebug;
//# sourceMappingURL=debug.js.map