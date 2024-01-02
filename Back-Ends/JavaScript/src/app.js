import { config } from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";

config();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", router);

const port = process.env.PORT;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on localhost:${port}`));

export default app;
