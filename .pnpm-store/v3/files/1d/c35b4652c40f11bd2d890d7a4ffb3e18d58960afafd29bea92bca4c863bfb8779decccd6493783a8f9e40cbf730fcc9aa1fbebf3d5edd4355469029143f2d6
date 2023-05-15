/** @internal */
export const make = (label, startTime) => ({
  label,
  startTime
});
/** @internal */
export const render = now => {
  return self => {
    const label = self.label.replace(/[\s="]/g, "_");
    return `${label}=${now - self.startTime}ms`;
  };
};
//# sourceMappingURL=logSpan.mjs.map