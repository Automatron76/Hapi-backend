import Boom from "@hapi/boom";
import { db } from "../models/db.js";
export const journalsApi = {
    findAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const journals = await db.journalStore.find();
                return h.response(journals).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    findByCandidate: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const journals = (await db.journalStore.findBy(request.params.id));
            return h.response(journals).code(200);
        },
    },
    makeJournal: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const candidate = (await db.candidateStore.findOne(request.params.id));
            if (candidate === null) {
                return Boom.notFound("No Candidate with this id");
            }
            const journalPayload = request.payload;
            const journal = {
                visit: journalPayload.visit,
                method: journalPayload.method,
                donor: request.auth.credentials._id,
                candidate: candidate,
                lat: journalPayload.lat,
                lng: journalPayload.lng,
            };
            const newJournal = (await db.journalStore.add(journal));
            return h.response(newJournal).code(200);
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            console.log("delete...");
            await db.journalStore.delete();
            return h.response().code(204);
        },
    },
};
