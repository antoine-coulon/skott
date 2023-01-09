export async function tryOrElse(
  fn: (...args: any[]) => any,
  orElse: (...args: any[]) => any
) {
  try {
    return await fn();
  } catch {
    return await orElse();
  }
}
