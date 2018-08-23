// Defines an express app that runs the boilerplate codebase.

import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import { ApplicationError } from "./lib/errors";



//Event Routes
import {
  create as createEventRoutes,
  getEvent as getEventRoutes
} from "./routes/event";

export default function createRouter() {
  // *********
  // * SETUP *
  // *********

  const router = express.Router();

  // static assets, served from "/public" on the web
  router.use("/public", express.static(path.join(__dirname, "..", "public")));

  router.use(cookieParser()); // parse cookies automatically
  router.use(bodyParser.json()); // parse json bodies automatically


  router.get("/*", (req, res, next) => {
    res.set({
      "Last-Modified": new Date().toUTCString(),
      Expires: -1,
      "Cache-Control": "must-revalidate, private"
    });
    next();
  });



  // ************* event routes ********************
  router.post("/event", createEventRoutes);
  router.get("/event", getEventRoutes);

  router.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).send({
        data: err.data || {},
        message: { errMsg: err.message, errCode: err.statusCode }
      });
      return;
    }

    res.status(500).send({
      message: "Uncaught error"
    }); // uncaught exception
  });

  router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/views/event.html'));
  })

  return router;
}
