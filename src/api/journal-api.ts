import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Candidate, Poe } from "../types/poe-types.js";

export const journalsApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const journals = await db.journalStore.find();
        return h.response(journals).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByCandidate: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const journals = (await db.journalStore.findBy(request.params.id)) as Poe;
      return h.response(journals).code(200);
    },
  },

  makeJournal: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const candidate = (await db.candidateStore.findOne(request.params.id)) as Candidate;
      if (candidate === null) {
        return Boom.notFound("No Candidate with this id");
      }
      const journalPayload = request.payload as Poe;
      const journal = {
        amount: journalPayload.amount,
        method: journalPayload.method,
        donor: request.auth.credentials._id,
        candidate: candidate,
        lat: journalPayload.lat,
        lng: journalPayload.lng,
      };
      const newJournal = (await db.journalStore.add(journal)) as Poe;
      return h.response(newJournal).code(200);
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      console.log("delete...");
      await db.journalStore.delete();
      return h.response().code(204);
    },
  },
};
