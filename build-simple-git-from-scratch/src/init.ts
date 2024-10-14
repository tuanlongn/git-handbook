import * as fs from "fs";
import * as path from "path";

export function init() {
  const gitDir = path.join(process.cwd(), ".sgit");
  if (fs.existsSync(gitDir)) {
    console.log("Repository already initialized.");
    return;
  }
  fs.mkdirSync(gitDir);
  fs.mkdirSync(path.join(gitDir, "objects"));
  fs.writeFileSync(path.join(gitDir, "HEAD"), "ref: refs/heads/master");
  console.log("Initialized empty repository.");
}
