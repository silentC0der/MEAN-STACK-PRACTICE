// Defines an express app that runs the boilerplate codebase.

import "babel-polyfill";
import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import { getEnv } from "./lib/env";
import createRouter from "./router";


app.get('/', (req, res) => {
  res.sendFile(path.resolve('./public/views/event.html'));
})
const app = express();
app.use(createRouter());
const port = 3000;
http
  .createServer(app)
  .listen(port, () => console.log(`Listening on port ${port}`));
