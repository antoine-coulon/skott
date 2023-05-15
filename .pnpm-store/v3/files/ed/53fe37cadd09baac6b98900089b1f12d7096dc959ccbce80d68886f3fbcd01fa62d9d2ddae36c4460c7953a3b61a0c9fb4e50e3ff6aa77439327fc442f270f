interface SnapshotEnvironment {
    resolvePath(filepath: string): Promise<string>;
    prepareDirectory(filepath: string): Promise<void>;
    saveSnapshotFile(filepath: string, snapshot: string): Promise<void>;
    readSnapshotFile(filepath: string): Promise<string | null>;
    removeSnapshotFile(filepath: string): Promise<void>;
}
declare function setupSnapshotEnvironment(environment: SnapshotEnvironment): void;

export { SnapshotEnvironment as S, setupSnapshotEnvironment as s };
