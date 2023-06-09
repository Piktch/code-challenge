import app from "../app";
import request from "supertest";

test("Empty body error", async () => {
  const res = await request(app).post("/api/get-exchange");
  expect(res.body).toEqual({ status: "error", message: "Something went wrong!"});
});
test("Empty body error", async () => {
  const res = await request(app).post("/api/get-exchange").send({
    from: "EUR",
    fromValue: 10,
    to: "USD"
  })
  expect(res.body.status).toEqual("success")
  expect(res.body.value).toBeDefined()
});