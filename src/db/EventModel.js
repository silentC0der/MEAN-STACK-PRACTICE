import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";
import { filterFields } from "../lib/filter";
import { default as eventSchema } from "../schemas/event.schema.js";

export default class eventModel extends BaseModel {
    constructor(connection) {
        super("event", connection);
        this.schema = eventSchema;
        this.name = "event";
        this.model = this.connection.model(this.name, this.schema);
    }
    async create(eventInformation) {
        try {
            if (eventInformation) {
                const result = await this.model.update(eventInformation, {
                    upsert: true,
                    setDefaultsOnInsert: true
                });
                if (result) {
                    const event = await this.model.findOne({
                        eventId: eventInformation.eventId
                    });
                    if (!event) {
                        throw new Error("Error In Creating Of Event");
                    }
                    return result;
                }
            } else {
                throw new ApplicationError(error, 500, {});
            }
        } catch (error) {
            console.log(error);
            console.log('error 3');
            throw error;
        }
    }

    async get(eventInformation) {
        try {
            let { eventID } = eventInformation;
            const event = await this.model
                .find({
                    eventID: eventID,
                    eventStatus: true
                })
                .lean();
            if (!event[0]) {
                throw new Error(
                    "No such Event. Please try again"
                );
            } else {
                return event;
            }
        } catch (error) {
            throw new ApplicationError(error, 500, {});
        }
    }
}