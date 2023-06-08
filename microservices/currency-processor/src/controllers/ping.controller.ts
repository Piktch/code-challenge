import * as express from 'express';

export const pingController = (req: express.Request, res: express.Response) => {
  return res.json({ message: "It is runned" });
}