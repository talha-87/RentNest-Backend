import express from "express";
import cors from "cors";

import router from "./app/routes";
import globalErrorHandler from "./app/errors/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RentNest API is running...",
  });
});

app.use(globalErrorHandler);

export default app;