import { init } from "./init";
import { add } from "./add";
import { commit } from "./commit";
import { log } from "./log";
import { status } from "./status";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "init":
    init();
    break;
  case "add":
    add(args[1]);
    break;
  case "commit":
    commit(args[1]);
    break;
  case "log":
    log();
    break;
  case "status":
    status();
    break;
  default:
    console.log("Commands: init, add <file>, commit <message>, log");
}
