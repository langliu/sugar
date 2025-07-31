import { Hono, HonoRequest } from "hono";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/d1';

export type Env ={
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  const db = drizzle(c.env.DB);
  return c.json({
    message: "Hello, This is Hono !!!",
  });
});

export default {
  fetch: app.fetch,
  port: 4200
};