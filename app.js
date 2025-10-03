import express from "express";
import libraryRouter from "./src/library/library.router.js";
import { ErrorMiddleWare } from "./src/common/middlewares/error.middleware.js";
import morgan from "./src/common/middlewares/morgan.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan);

app.use("/library", libraryRouter);
app.use((err, req, res, next) => {
  ErrorMiddleWare(err, req, res, next);
});

app.listen(port, () => {
  console.log(port, "로 서버 열림.");
});
