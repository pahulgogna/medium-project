import CreateBlogInput from '../components/CreateBlogInput'
import CreateBlogPreview from '../components/CreateBlogPreview'

function CreateBlog() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
        <CreateBlogInput/>
        <div className='hidden md:block'>
            <CreateBlogPreview/>
        </div>
    </div>
  )
}

export default CreateBlog
