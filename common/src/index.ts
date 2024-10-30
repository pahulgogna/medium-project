import z from 'zod'


// Users -----

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})


// Blogs -----

export const blogSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    published: z.boolean().optional(),
})

export const blogUpdateSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    published: z.boolean().optional(),
    id: z.string()
})


export type UserSchema = z.infer<typeof userSchema>
export type BlogSchema = z.infer<typeof blogSchema>
export type BlogUpdateSchema = z.infer<typeof blogUpdateSchema>