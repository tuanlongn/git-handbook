import * as fs from "fs";
import * as path from "path";

export function log() {
  const gitDir = path.join(process.cwd(), ".sgit");
  const headPath = path.join(gitDir, "HEAD");
  if (!fs.existsSync(headPath)) {
    console.error("No commits found.");
    return;
  }

  const ref = fs.readFileSync(headPath, "utf-8").trim();
  let commitHash = fs
    .readFileSync(path.join(gitDir, ref.substring(5)), "utf-8")
    .trim();

  while (commitHash) {
    const commitPath = path.join(gitDir, "objects", commitHash);
    const commitContent = fs.readFileSync(commitPath, "utf-8");
    const commit = JSON.parse(commitContent);

    console.log(`Commit: ${commitHash}`);
    console.log(`Message: ${commit.message}\n`);

    commitHash = commit.parent;
  }
}
