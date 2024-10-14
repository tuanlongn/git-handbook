import * as fs from "fs";
import * as path from "path";
import { hashObject } from "./hash-object";

export function commit(message: string) {
  const gitDir = path.join(process.cwd(), ".sgit");
  const indexPath = path.join(gitDir, "index");
  if (!fs.existsSync(indexPath)) {
    console.error("Nothing to commit.");
    return;
  }

  const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));

  // Create tree object (for simplicity, we'll store the index as the tree)
  const treeContent = Buffer.from(JSON.stringify(index));
  const treeHash = hashObject(treeContent);
  fs.writeFileSync(path.join(gitDir, "objects", treeHash), treeContent);

  // Get parent commit
  const headPath = path.join(gitDir, "HEAD");
  let parent = null;
  if (fs.existsSync(headPath)) {
    const ref = fs.readFileSync(headPath, "utf-8").trim();
    const refPath = path.join(gitDir, ref);
    if (fs.existsSync(refPath)) {
      parent = fs.readFileSync(refPath, "utf-8").trim();
    }
  }

  // Create commit object
  const commitObject = {
    tree: treeHash,
    parent: parent,
    message: message,
  };
  const commitContent = Buffer.from(JSON.stringify(commitObject));
  const commitHash = hashObject(commitContent);
  fs.writeFileSync(path.join(gitDir, "objects", commitHash), commitContent);

  // Update ref
  const masterRef = path.join(gitDir, "refs", "heads", "master");
  fs.mkdirSync(path.dirname(masterRef), { recursive: true });
  fs.writeFileSync(masterRef, commitHash);
  console.log(`Committed changes: ${message}`);

  // Clear the staging area
  fs.unlinkSync(indexPath);
}
