import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { resource } from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const swaggerDocument = YAML.load('./openapi.yaml');

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/resources", resource);

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`API Docs available at http://localhost:${port}/api-docs`);
});