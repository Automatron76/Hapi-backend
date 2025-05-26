import { JournalMongoose } from "./journal.js";
export const journalStore = {
    async find() {
        const journals = await JournalMongoose.find().populate("donor").populate("candidate").lean();
        journals.forEach((donation) => {
            // @ts-ignore
            donation.donor = `${donation.donor.firstName} ${donation.donor.lastName}`;
        });
        return journals;
    },
    async findBy(id) {
        const journal = await JournalMongoose.findOne({ candidate: id });
        if (!journal) {
            return null;
        }
        return journal;
    },
    async add(journal) {
        let newJournal = new JournalMongoose({ ...journal });
        await newJournal.save();
        const populatedJournal = await JournalMongoose.findById(newJournal._id).populate("donor").populate("candidate").lean();
        return newJournal;
    },
    async delete() {
        await JournalMongoose.deleteMany({});
    },
};
