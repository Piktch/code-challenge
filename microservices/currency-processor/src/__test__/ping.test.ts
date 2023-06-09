import app from "../app";
import request from "supertest";

test("Catch-all route", async () => {
  const res = await request(app).get("/api/ping");
  expect(res.body).toEqual({ message: "It is runned" });
});