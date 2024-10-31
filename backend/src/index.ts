import { Hono } from 'hono'
import UserRoutes from './routes/user';
import BlogRoutes from './routes/blogs';
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors())

app.route('/api/v1/blog', BlogRoutes)
app.route('/api/v1/user', UserRoutes)


export default app