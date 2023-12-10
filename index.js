import cors from "cors";
import express from "express";
import { config } from "dotenv";

import v1 from "./router/v1/manga.router.js";
import v2 from "./router/v2/manga.router.js";

config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listing in ${port}`);
});

app.get("/", async (req, res) => {
  res.status(200).json("Hello World in Manga API");
});

app.use("/v1", v1);
app.use("/v2", v2);
