import { route } from "./";
import EventModel from "../db/EventModel";
import { filterFields } from "../lib/filter";
import _ from "lodash";
import { ApplicationError } from "../lib/errors";
import uuid from "uuid";

export const create = route(async (req, res) => {
    const eventModel = new EventModel();
    try {
        console.log('-----------');
        console.log(req.body);
        const eventInformation = req.body;
        if (eventInformation) {
            let newEvent = Object.assign({}, eventInformation, {
                eventId: uuid.v1()
            });
            if (!_.isEmpty(newEvent)) {
                console.log('here comming--------');
                const event = await eventModel.create(newEvent);
                res.send({ results: event });
            } else {
                throw new ApplicationError("No eventInformation Provided !!!", 501, {});
            }
        } else {
            throw new ApplicationError("No eventInformation Provided With All Mendatory Information!!!", 500, {});
        }
    } catch (error) {
        console.log(error);
        throw new ApplicationError(error, 500, {});
    }
});

export const getEvent = route(async (req, res) => {
    const eventModel = new EventModel();
    try {
        if (req.params.eventId) {
            const event = await eventModel.getEvent(req.params.eventId);
            res.send({ results: event });
        } else {
            throw new ApplicationError("No eventId  Provided !!!", 501, {});
        }
    } catch (error) {
        throw new ApplicationError(error, 500, {});
    }
});
