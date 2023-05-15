/** @internal */
export function concat<B>(that: Iterable<B>) {
  return <A>(self: Iterable<A>): Iterable<A | B> => {
    return {
      [Symbol.iterator]() {
        const iterA = self[Symbol.iterator]()
        let doneA = false
        let iterB: Iterator<B>
        return {
          next() {
            if (!doneA) {
              const r = iterA.next()
              if (r.done) {
                doneA = true
                iterB = that[Symbol.iterator]()
                return iterB.next()
              }
              return r
            }
            return iterB.next()
          }
        }
      }
    }
  }
}
