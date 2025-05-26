import { connectMongo } from "./mongo/connect.js";
import { Db } from "../types/store-types.js"

export const db = {
  userStore: null,
  candidateStore: null,
  journalStore: null,
};

export function connectDb(dbType) {
  switch (dbType) {
    case "mongo":
      connectMongo(db);
      break;
    default:
  }
}
