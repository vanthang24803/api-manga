import cors from "cors";
import express from "express";
import { config } from "dotenv";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import v1 from "./router/v1/manga.router.js";
import v2 from "./router/v2/manga.router.js";

config();

const app = express();
app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Manga Express API with Swagger",
      version: "1.0.0",
      description:
        "This is Manga API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: `${process.env.BASE_URL}/v1`,
      },
    ],
  },
  apis: ["./router/v1/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listing in ${port}`);
});

app.get("/", async (req, res) => {
  res.status(200).json({
    title: "Hello World in Manga API",
    version : "1.0.0",
    document: `${process.env.BASE_URL}/docs`,
    github: "https://github.com/vanthang24803/api-manga",
  });
});

app.use("/v1", v1);
app.use("/v2", v2);
