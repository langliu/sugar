import { Hono } from "hono";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/d1';
import { posts } from './db/schema';

export type Env = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  const db = drizzle(c.env.DB);
  return c.json({
    message: "Hello, This is Hono !!!",
  });
});

app.get("/posts", async (c) => {
  const db = drizzle(c.env.DB);
  const res = await db.select().from(posts).all();
  return c.json(res);
});

export default app;