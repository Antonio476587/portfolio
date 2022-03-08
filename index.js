import dotenv from "dotenv";
import express from "express";

import { connectToDB, getDB } from "./db/db.js";
import render from "./server/render.jsx";

const app = express();

dotenv.config();

const url = process.env.URL || "fantonix.space";

app.use(express.raw());
app.use(express.json());
app.use(express.static("public"));

app.post("/messages", async (req, res) => {
  const db = getDB();
  const { messages } = db.data;
  const message = messages.push(req.body);
  await db.write();
  res.send("The message was succesfully recibed.");
});

app.all("*", (req, res, next) => {
  if (req.url.match(/www/)) res.redirect(301, url);
  next();
});

app.get("*", (req, res, next) => {
  render(req, res, next);
});

const port = process.env.PORT || 8000;

connectToDB();
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
