let _snapshotEnvironment;
function setupSnapshotEnvironment(environment) {
  _snapshotEnvironment = environment;
}
function getSnapshotEnironment() {
  if (!_snapshotEnvironment)
    throw new Error("Snapshot environment is not setup");
  return _snapshotEnvironment;
}

export { getSnapshotEnironment as g, setupSnapshotEnvironment as s };
