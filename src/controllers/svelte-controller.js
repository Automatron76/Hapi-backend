import { db } from "../models/db.js";
export const svelteController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const candidates = await db.candidateStore.find();
            return h.view("journal", { title: "Make a plan", user: loggedInUser, candidates: candidates, });
        },
    },
    journal: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const journalPayload = request.payload;
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
            }
            catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        },
    },
    report: {
        handler: async function (request, h) {
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
