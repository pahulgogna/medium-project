import { Hono } from 'hono'
import UserRoutes from './routes/user';
import BlogRoutes from './routes/blogs';

const app = new Hono()

app.route('/api/v1/blog', BlogRoutes)
app.route('/api/v1/user', UserRoutes)


export default app