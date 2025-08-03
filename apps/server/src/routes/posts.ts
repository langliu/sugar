import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { posts } from '../db/schema'
import { Env } from '../env'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const postsRoute = new Hono<{ Bindings: Env }>()

const createPostSchema = z.object({
  title: z.string(),
  content: z.string({ error: '情绪撒的倾洒大' })
})

postsRoute.get('/', async (c) => {
  const db = drizzle(c.env.DB)
  const res = await db.select().from(posts).all()
  return c.json(res)
})

postsRoute.post('/',
  zValidator('json', createPostSchema, (result, c) => {
    if (!result.success) {
      return c.json({
        title: result.error.name,
        issues: result.error.issues,
      }, 400)
    }
  }),
  async (c) => {
    const data = c.req.valid('json')
    const db = drizzle(c.env.DB)
    const res = await db.insert(posts).values({
      title: data.title,
      content: data.content
    }).returning()
    return c.json(res)
  })

export { postsRoute }