export const AsyncWrapper = (cb) => {
  return async (req, res, next) => await cb(req, res, next).catch(next);
};
