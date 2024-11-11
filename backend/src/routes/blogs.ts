import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import {blogSchema, blogUpdateSchema} from '@pahul100/medium-common'


interface blog_type {
    title: string,
    content: string,
    published: boolean,
    id?: string
}

const BlogRoutes = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string,
    },
    Variables:{
      prisma: PrismaClient,
      user: string,
      blog: blog_type
    }
}>()

// Middlewares -----

// Auth middlewares
BlogRoutes.use("/*", async (c, next) => {
    try{
      const header = c.req.header("authorization") || "";
      const token = header.split(' ')[1];
  
      const response= await verify(token, c.env.JWT_SECRET)
  
      if(response.id){
        // @ts-ignore
        c.set('user', response.id)
        await next()
      }
      else{
        c.status(403)
        return c.json({"detail": "Unauthorized"})
      }
    }
    catch{
      c.status(403)
      return c.json({"detail": "Unauthorized"})
    }
  })

// initializing db middleware
BlogRoutes.use("/*", async (c, next) => {
    try{
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
      // @ts-ignore
      c.set('prisma', prisma)
  
      await next()
    }
    catch{
      c.status(500)
      return c.json({
        'message': 'ERROR' 
      })
    }
})


// routes -----

BlogRoutes.post("/",
    async (c, next) => {
        const data = await c.req.json()
        let parsed = blogSchema.safeParse(data)
        if(parsed.success){
        await next()
        }
        else{
        c.status(400)
        return c.json({
            'detail': parsed.error.issues
        })
        }
    },
    async (c) => {
        
        const prisma = c.get('prisma')
        const body = await c.req.json()

        const currentUser = c.get('user')

        
        try{
            let date = new Date()
            let post = await prisma.post.create({
                select : {
                    id: true
                },
            data:{
                title: body.title,
                content: body.content,
                published: body.published,
                authorId: currentUser,
                publishDate: date.toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})
            }
            })

            let user = await prisma.user.update({
            where:{
                id: currentUser
            },
            data:{
                posts: {
                connect: {
                    id: post.id
                }
                }
            }
            })

            return c.json<{ detail: string }>({
            detail: post.id
            })
        }
        catch{
        c.status(500)
        return c.json({
            'detail':'Server Error'
        })
        }
})

BlogRoutes.put("/",
    async (c, next) => {
        const data = await c.req.json()
        let parsed = blogUpdateSchema.safeParse(data)
        if(parsed.success){
            // @ts-ignore
            c.set('blog', parsed.data)
            await next()
        }
        else{
            c.status(400)
            return c.json({
                'detail': parsed.error.issues
            })
        }
    },
    async (c) => {
        
        const prisma = c.get('prisma')
        const body = c.get('blog')

        const currentUser = c.get('user')

        try{
            let post = await prisma.post.update({
                where:{
                    id: body.id,
                    authorId: currentUser
                },
                data:{
                    title: body.title,
                    content: body.content,
                    published: body.published,
                }
            })

            c.status(201)
            return c.json<{ detail: string, id: string }>({
                detail:'Blog published.',
                id: post.id
            })
        }
        catch{
            c.status(500)
            return c.json({
                'detail':'Server Error'
            })
        }
})

// TODO: pagination
BlogRoutes.get("/bulk", async (c) => {
    const prisma = c.get('prisma')

    try{
        const blogs = await prisma.post.findMany({
            orderBy: [
                {
                    clicks: 'asc'
                }
            ],
            select: {
                content: true,
                title: true,
                id: true,
                publishDate: true,
                clicks: true,
                author: {
                    select: {
                        name: true
                    }
                }
            },
            where:{
                published: true
            }
        })
        return c.json({
            'data':blogs.reverse()
        })
    }catch (e) {
        console.log(e)
        return c.json({
            'detail': 'some error occurred'
        })
    }

})

BlogRoutes.get("/:id", async (c) => {
    const prisma = c.get('prisma')
    const body = c.req.param()

    try{
        const blog = await prisma.post.findFirst({
            select: {
                content: true,
                title: true,
                id: true,
                publishDate: true,
                author: {
                    select: {
                        name: true
                    }
                },
                clicks: true
            },
            where:{
                id: body.id
            }
        })

        if(blog){
            await prisma.post.update({
                where:{
                    id: body.id
                },
                data:{
                    clicks: blog.clicks + 1 
                }
            })
        }

        return c.json({
            'data': blog
        })

    }catch(e) {
        console.log(e)
        c.status(404)
        return c.json({
            'detail':'Not Found'
        })
    }
})



export default BlogRoutes