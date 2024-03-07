import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function spawnGitCommand(args) {
  return cp
    .spawnSync("git", args, {
      encoding: "utf-8"
    })
    .stdout.replace("\n", "");
}

function findCurrentGitCommitHash() {
  try {
    return spawnGitCommand(["rev-parse", "HEAD"]);
  } catch {
    return "unknown_commit_hash";
  }
}

function findCurrentGitReference() {
  try {
    return spawnGitCommand(["rev-parse", "--abbrev-ref", "HEAD"]);
  } catch {
    return "unknown_reference";
  }
}

function retrieveGitInformation() {
  const commitHash = process.env.GITHUB_SHA ?? findCurrentGitCommitHash();
  const branchReference = process.env.GITHUB_REF ?? findCurrentGitReference();

  return {
    commitHash,
    branchReference
  };
}

function fromVitestBenchResultToSkottResult(benchmark) {
  const content = JSON.parse(benchmark);
  const results = content.testResults.skott_benchmark;
  const { commitHash, branchReference } = retrieveGitInformation();

  return {
    name: "skott_benchmark",
    done_at: new Date(),
    git_commit_hash: commitHash,
    git_branch_reference: branchReference,
    results: results.map((_) => {
      return {
        name: _.name,
        rank: _.rank,
        samples: _.samples,
        totalTime: _.totalTime,
        min: _.min,
        mean: _.mean,
        max: _.max
      };
    })
  };
}

const pathToResult = path.join(
  process.cwd(),
  "test",
  "benchmark",
  "result.json"
);

export function keepOnlyRelevantInformationFromResultFile(
  done
) {
  fs.readFile(pathToResult, { encoding: "utf-8" }, (error, content) => {
    if (error) {
      return done(new Error("An error happened while reading the result file"));
    }

    return fs.writeFile(
      pathToResult,
      JSON.stringify(fromVitestBenchResultToSkottResult(content)),
      { encoding: "utf-8" },
      (error) => {
        if (error) {
          return done(
            new Error("An error happened while writing the result file")
          );
        }

        return done();
      }
    );
  });
}

keepOnlyRelevantInformationFromResultFile((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
});
