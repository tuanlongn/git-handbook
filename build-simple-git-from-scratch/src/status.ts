// src/status.ts
import * as fs from "fs";
import * as path from "path";
import { hashObject } from "./hash-object";

export function status() {
  const gitDir = path.join(process.cwd(), ".sgit");

  // Ensure the repository is initialized
  if (!fs.existsSync(gitDir)) {
    console.error("Not a sgit repository.");
    return;
  }

  // Load the index (staging area)
  const indexPath = path.join(gitDir, "index");
  let index: { [key: string]: string } = {};
  if (fs.existsSync(indexPath)) {
    index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  }

  // Get the list of files in the working directory
  const workingDirFiles = getAllFiles(process.cwd(), gitDir);

  // Load the last commit's tree
  let lastCommitTree: { [key: string]: string } = {};
  const headRefPath = path.join(gitDir, "HEAD");
  if (fs.existsSync(headRefPath)) {
    const ref = fs.readFileSync(headRefPath, "utf-8").trim().split(" ")[1];
    const refPath = path.join(gitDir, ref);
    if (fs.existsSync(refPath)) {
      const lastCommitHash = fs.readFileSync(refPath, "utf-8").trim();
      const commitObjectPath = path.join(gitDir, "objects", lastCommitHash);
      if (fs.existsSync(commitObjectPath)) {
        const commitContent = fs.readFileSync(commitObjectPath, "utf-8");
        const commit = JSON.parse(commitContent);
        const treeHash = commit.tree;
        const treePath = path.join(gitDir, "objects", treeHash);
        const treeContent = fs.readFileSync(treePath, "utf-8");
        lastCommitTree = JSON.parse(treeContent);
      }
    }
  }

  const changesToBeCommitted: string[] = [];
  const changesNotStagedForCommit: string[] = [];
  const untrackedFiles: string[] = [];

  // Map working directory files for easy access
  const workingDirFileHashes: { [key: string]: string } = {};
  for (const filePath of workingDirFiles) {
    const relativePath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath);
    const fileHash = hashObject(content);
    workingDirFileHashes[relativePath] = fileHash;
  }

  // Check for changes to be committed and changes not staged
  for (const filePath of Object.keys(workingDirFileHashes)) {
    const workingFileHash = workingDirFileHashes[filePath];
    const indexHash = index[filePath];
    const lastCommitHash = lastCommitTree[filePath];

    if (indexHash && indexHash !== lastCommitHash) {
      if (workingFileHash === indexHash) {
        changesToBeCommitted.push(filePath);
      } else {
        changesNotStagedForCommit.push(filePath);
      }
    } else if (indexHash && workingFileHash !== indexHash) {
      changesNotStagedForCommit.push(filePath);
    } else if (!indexHash && !lastCommitHash) {
      untrackedFiles.push(filePath);
    } else if (!indexHash && lastCommitHash) {
      if (workingFileHash !== lastCommitHash) {
        changesNotStagedForCommit.push(filePath);
      }
    }
  }

  // Check for deleted files
  for (const filePath of Object.keys(index)) {
    if (!workingDirFileHashes[filePath]) {
      changesNotStagedForCommit.push(filePath + " (deleted)");
    }
  }

  // Output the status
  console.log("On branch master\n");

  if (changesToBeCommitted.length > 0) {
    console.log("Changes to be committed:");
    changesToBeCommitted.forEach((file) => {
      console.log(`\t${file}`);
    });
    console.log("");
  }

  if (changesNotStagedForCommit.length > 0) {
    console.log("Changes not staged for commit:");
    changesNotStagedForCommit.forEach((file) => {
      console.log(`\t${file}`);
    });
    console.log("");
  }

  if (untrackedFiles.length > 0) {
    console.log("Untracked files:");
    untrackedFiles.forEach((file) => {
      console.log(`\t${file}`);
    });
    console.log("");
  }

  if (
    changesToBeCommitted.length === 0 &&
    changesNotStagedForCommit.length === 0 &&
    untrackedFiles.length === 0
  ) {
    console.log("Nothing to commit, working directory clean.");
  }
}

function getAllFiles(dirPath: string, excludeDir: string): string[] {
  let files: string[] = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (fullPath.startsWith(excludeDir)) {
      continue;
    }
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, excludeDir));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}
