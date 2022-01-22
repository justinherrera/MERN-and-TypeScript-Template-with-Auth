import { Request, Response, NextFunction } from "express"

type func = (req: Request, res: Response, next: NextFunction) => Promise<string>

export default function (fn: func) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
};
  