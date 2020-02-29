import express from "express";
import { config } from "dotenv";
import { getDescription, initComputerVisionClient } from "./cv";

const res = config();
if (res.error) {
  throw res.error;
}
const alter = new express();
const port = 6161;

alter.get("/alter/describe", async (request, response) => {
  const imageUrls = [].concat(request.query.imageUrl);
  const captions = await Promise.all(
    imageUrls.map(async url => await getDescription(url))
  );
  response.json(captions);
});

initComputerVisionClient();
alter.listen(port, _ => {
  console.log(`alter can now analyze`);
});
