import * as crypto from "crypto";

export function hashObject(content: Buffer): string {
  return crypto.createHash("sha1").update(content).digest("hex");
}
