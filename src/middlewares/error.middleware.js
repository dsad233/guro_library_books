import { StatusCodes } from "http-status-codes";
export const ErrorMiddleWare = (err, req, res, next) => {
  return res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
};
