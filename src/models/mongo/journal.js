import { Schema, model } from "mongoose";
const journalSchema = new Schema({
    amount: Number,
    method: String,
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    candidate: {
        type: Schema.Types.ObjectId,
        ref: "Candidate",
    },
    lat: String,
    lng: String,
});
export const JournalMongoose = model("Journal", journalSchema);
