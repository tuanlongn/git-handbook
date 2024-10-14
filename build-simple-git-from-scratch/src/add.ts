import * as fs from "fs";
import * as path from "path";
import { hashObject } from "./hash-object";

export function add(filePath: string) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`File ${filePath} does not exist.`);
    return;
  }

  const content = fs.readFileSync(absolutePath);
  const hash = hashObject(content);

  // Store the blob
  const objectPath = path.join(process.cwd(), ".sgit", "objects", hash);
  fs.writeFileSync(objectPath, content);

  // Update the index (staging area)
  const indexPath = path.join(process.cwd(), ".sgit", "index");
  let index: { [key: string]: string } = {};
  if (fs.existsSync(indexPath)) {
    index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  }
  index[filePath] = hash;
  fs.writeFileSync(indexPath, JSON.stringify(index));
  console.log(`Added ${filePath} to staging area.`);
}
