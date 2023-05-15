/** @internal */
export class SingleShotGen {
  constructor(self) {
    this.self = self;
    this.called = false;
  }
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  throw(e) {
    throw e;
  }
  [Symbol.iterator]() {
    return new SingleShotGen(this.self);
  }
}
//# sourceMappingURL=singleShotGen.mjs.map