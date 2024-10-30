import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { sign, verify } from 'hono/jwt'
import CryptoJS from 'crypto-js';
import { withAccelerate } from '@prisma/extension-accelerate';
import { userSchema } from '@pahul100/medium-common';



const UserRoutes = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string,
    },
    Variables:{
      prisma: PrismaClient,
      user: string
    }
}>()

// middleware -----
UserRoutes.use("/*", async (c, next) => {
    try{
      const header = c.req.header("authorization") || "";
      const token = header.split(' ')[1];
  
      const response = await verify(token, c.env.JWT_SECRET)
  
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
UserRoutes.use("/*", async (c, next) => {
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
        "message": "ERROR" 
      })
    }
  })
  


// routes -----

UserRoutes.post("/signup",
    async (c, next) => 
      {
        const body = await c.req.json()
        let parsed = userSchema.safeParse(body)
  
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
  
    const prisma = c.get("prisma")
  
    const body = await c.req.json()
  
    const password = CryptoJS.SHA256(body.password).toString()
    try{
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: password, 
        }
        })
      let expire = Date.now() + 1000 * 60 * 60 * 24 * 7
  
      const token = await sign({ id: user.id, exp: Math.floor(expire/1000)}, c.env.JWT_SECRET)
    
      return c.json({
        "token": token
      })
    }
    catch{
      c.status(400)
      return c.json({"detail":"Bad Request"})
    }
  })
  
UserRoutes.post("/signin",
    async (c, next) => 
      {
        const body = await c.req.json()
        let parsed = userSchema.safeParse(body)
  
        if(parsed.success){
          await next()
        }
        else{
          c.status(400)
          return c.json({
            'detail': parsed.error.issues
          })
        }
      }, async (c) => {

const prisma = c.get('prisma')

const body = await c.req.json()

const user = await prisma.user.findUnique({
    where: {
    email: body.email,
    }
})

if (!user) {
    c.status(404)
    return c.json({
    "error": "User not found"
    })
}
else{
    const password = CryptoJS.SHA256(body.password).toString()
    if (password === user.password) {
    let expire = Date.now() + 1000 * 60 * 60 * 24 * 7
    const token = await sign({ id: user.id, exp: Math.floor(expire/1000)}, c.env.JWT_SECRET)
    return c.json({
        "token": token
    })
    }
    else{
    c.status(401)
    return c.json({
        "error": "Invalid password"
    })
    }
}

})
  
UserRoutes.get('/', async (c) => {
const prisma = c.get('prisma')

const currentUser = c.get('user')

try{

    let user = await prisma.user.findUnique({
    where: {
        id: currentUser
    }
    })

    if(user){
    return c.json(user)
    }
    else{
    c.status(404)
    c.json({
        'detail':'user not found'
    })
    }
}
catch{
    c.status(500)
    return c.json({
    'detail': 'some error occurred'
    })
}


})


export default UserRoutes