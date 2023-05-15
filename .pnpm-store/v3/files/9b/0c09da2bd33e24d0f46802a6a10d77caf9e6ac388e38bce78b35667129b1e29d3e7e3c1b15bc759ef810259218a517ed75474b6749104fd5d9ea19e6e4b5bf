/**
 * @since 1.0.0
 */
const globalStoreId = Symbol.for("@effect/data/Global/globalStoreId")

if (!(globalStoreId in globalThis)) {
  globalThis[globalStoreId] = new Map()
}

const globalStore = globalThis[globalStoreId] as Map<unknown, any>

/**
 * @since 1.0.0
 */
export const globalValue = <A>(id: unknown, compute: () => A): A => {
  if (!globalStore.has(id)) {
    globalStore.set(id, compute())
  }
  return globalStore.get(id)!
}
