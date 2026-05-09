// Modified from https://github.com/luontola/tdd-mooc-small-steps/blob/main/tcr.mjs

import { execSync } from "child_process";
import chokidar from "chokidar";

function logCommand(command) {
  console.log("\n> " + command);
  return command;
}

function test() {
  execSync(logCommand("npm run test"), {
    stdio: "inherit",
    env: { ...process.env, MAX_CHANGES: process.env.MAX_CHANGES || "2" },
  });
}

function commit() {
  console.log("Tests passed -> Commit changes");
  const lastCommitMessage = execSync("git log -1 --pretty=%B", { encoding: "utf8" }).trim();
  const match = lastCommitMessage.match(/\(#(\d+)\)$/);
  if (!match) {
    console.log("TCR cancelled. Last commit message has invalid format.");
    process.exit(1);
  }
  const lastNumber = parseInt(match[1]);
  const newCommitMessage = lastCommitMessage.replace(/\(#\d+\)$/, `(#${lastNumber + 1})`);
  execSync(logCommand(`git commit --all --message="${newCommitMessage}"`), {
    stdio: "inherit",
  });
}

function revert() {
  console.log("Test failed -> Revert changes");
  execSync(logCommand("git reset --hard"), { stdio: "inherit" });
}

try {
  test();
} catch (e) {
  console.log("TCR cancelled. Tests need to start green.");
  process.exit(1);
}

chokidar.watch("src").on("all", (_event, _path) => {
  const changes = execSync("git diff --numstat", { encoding: "utf8" });
  if (changes !== "") {
    try {
      test();
      commit();
    } catch (e) {
      revert();
    }
  }
});
