import express from "express";
import libraryRouter from "./src/library/library.router.js";
import { ErrorMiddleWare } from "./src/middlewares/error.middleware.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("현재 시간: ", new Date().toLocaleString("ko-kr"));
  next();
});

app.use("/library", libraryRouter);
app.use((err, req, res, next) => {
  ErrorMiddleWare(err, req, res, next);
});

app.listen(port, () => {
  console.log(port, "로 서버 열림.");
});
