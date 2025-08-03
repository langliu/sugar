import { Hono } from "hono";
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'
import { prettyJSON } from 'hono/pretty-json'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/d1';
import { postsRoute } from './routes/posts';
import { Env } from './env';

const app = new Hono<{ Bindings: Env }>();

app.use(logger());
app.use(requestId());
app.use(prettyJSON({
  space: 2
}));

app.get("/", (c) => {
  const db = drizzle(c.env.DB);
  return c.json({
    message: "Hello, This is Hono !!!" + c.get('requestId'),
    requestId: c.get('requestId'),
  });
});


app.route('/api/posts', postsRoute);

export default app;