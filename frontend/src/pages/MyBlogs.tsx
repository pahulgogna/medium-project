import { useRecoilValueLoadable } from "recoil"
import BlogCard from "../components/BlogCard"
import { MyBlogsAtom } from "../store/atom/atoms"
import { BlogSkeleton } from "../components/LoadingSkeletons"
import { Link } from "react-router-dom"



function MyBlogs() {

  const BlogsData = useRecoilValueLoadable(MyBlogsAtom)


  
  if(BlogsData.state === "loading"){
    return (
      <>
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </>
    )
  }

  

  else if(BlogsData.state === "hasValue"){
    return (
      <>
        <div className="flex justify-center">
        {BlogsData.contents.length
        ? <div className="w-11/12">
          <h4 className="flex justify-end text-slate-500 font-semibold subpixel-antialiased">
            {BlogsData.contents.length} Blogs Found.
          </h4>
            {BlogsData.contents.map((blog, index) => {
                return(
                <div>
                    <BlogCard id={blog.id} author={{"name": blog.author?.name ? blog.author.name: '...', email: blog.author.email}} title={blog.title} publishDate={blog.publishDate ? blog.publishDate: ""} content={blog.content} key={index}/>
                </div>
                )
            })}
          </div>: 
          <div className="m-5 w-full">
            <h3>0 Blogs found.</h3>
            <h4>
              Create your first blog <Link className="text-blue-500" to={"/blogs/create"}>here!</Link>
            </h4>
          </div>
            }
        </div>
      </>
    )
  }
}


export default MyBlogs
