import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";
const crons = cronJobs();
crons.interval(
  "delete any old files marked for deletion",
  { minutes: 1 },
  internal.files.deleteAllFiles,
);
var crons_default = crons;
export { crons_default as default };
