import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const svelteController = {
    index: {
      handler: async function (request: Request, h: ResponseToolkit) {
        const loggedInUser = request.auth.credentials;
        const candidates = await db.candidateStore.find();
        return h.view("journal", { title: "Make a plan", user: loggedInUser, candidates: candidates, });
      },
    },

    journal: { 
      handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const loggedInUser = request.auth.credentials;
        const journalPayload = request.payload as any;
        const journal = {
          visit: journalPayload.amount,
          method: journalPayload.method,
          donor: loggedInUser._id,
          candidate: journalPayload.candidate,
          lat: journalPayload.lat,
          lng: journalPayload.lng,
        };
        await db.journalStore.add(journal);

        return h.redirect("/journal");
      } catch (err: any) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  report: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const journals = await db.journalStore.find();
      return h.view("report", {
        title: "Report",
        user: loggedInUser,
        donations: journals,
      });
    },
  },
  };
  