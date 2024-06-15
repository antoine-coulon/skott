import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";


function spawnCommand(command, args) {
  return cp
    .spawnSync(command, args, {
      encoding: "utf-8"
    })
    .stdout.replace("\n", "");
}

function findCurrentGitCommitHash() {
  try {
    return spawnCommand("git", ["rev-parse", "HEAD"]);
  } catch {
    return "unknown_commit_hash";
  }
}

function findCurrentGitReference() {
  try {
    return spawnCommand("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  } catch {
    return "unknown_reference";
  }
}

function retrieveGitInformation() {
  const commitHash = process.env.GITHUB_SHA ?? findCurrentGitCommitHash();
  const branchReference = process.env.GITHUB_HEAD_REF ?? findCurrentGitReference();

  return {
    commitHash,
    branchReference
  };
}

function fromVitestBenchResultToSkottResult(benchmark) {
  const content = JSON.parse(benchmark);
  const results = content.files[0].groups[0].benchmarks;
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

const pathToSourceResult = path.join(
  process.cwd(),
  "test",
  "benchmark",
  `result.json`
);

const makePathToDestinationResult = (nodeVersion) => path.join(
  process.cwd(),
  "test",
  "benchmark",
  `result-node-${nodeVersion}.json`
);

function prettyWrite(content) {
  return JSON.stringify(content, null, 2);
}

export function keepOnlyRelevantInformationFromResultFile(
  done
) {
  fs.readFile(pathToSourceResult, { encoding: "utf-8" }, (error, content) => {
    if (error) {
      return done(new Error("An error happened while reading the result file"));
    }

    const nodeVersion = process.env.NODE_VERSION ?? spawnCommand("node", ["-v"]);

    return fs.writeFile(
      makePathToDestinationResult(nodeVersion),
      prettyWrite(fromVitestBenchResultToSkottResult(content)),
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

  try {
    fs.unlinkSync(pathToSourceResult);
    process.exit(0);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }

});
