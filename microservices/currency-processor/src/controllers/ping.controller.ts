import * as express from 'express';

export const pingController = (req: express.Request, res: express.Response) => {
  const city: string = req.params.city;
    return res.json({ message: "It is runned" });
}