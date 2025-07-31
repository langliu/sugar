import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello, This is Hono !!!"));

export default {
  fetch: app.fetch,
  port: 4200
};