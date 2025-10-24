import morgan from "morgan";
export default morgan(function (tokens, req, res) {
  tokens.time = () => {
    return new Date().toLocaleString("ko-kr");
  };
  tokens.ip = () => {
    return req.ip || req.ips[0];
  };
  return [
    tokens.time(),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens.ip(),
  ].join(" ");
});
