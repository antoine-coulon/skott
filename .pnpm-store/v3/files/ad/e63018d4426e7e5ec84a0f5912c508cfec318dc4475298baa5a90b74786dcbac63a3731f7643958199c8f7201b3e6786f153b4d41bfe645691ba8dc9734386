/** @internal */
export function concat(that) {
  return self => {
    return {
      [Symbol.iterator]() {
        const iterA = self[Symbol.iterator]();
        let doneA = false;
        let iterB;
        return {
          next() {
            if (!doneA) {
              const r = iterA.next();
              if (r.done) {
                doneA = true;
                iterB = that[Symbol.iterator]();
                return iterB.next();
              }
              return r;
            }
            return iterB.next();
          }
        };
      }
    };
  };
}
//# sourceMappingURL=Iterable.mjs.map