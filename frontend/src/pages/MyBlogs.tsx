import { useRecoilValueLoadable } from "recoil"
import BlogCard from "../components/BlogCard"
import { MyBlogsAtom } from "../store/atom/atoms"
import { BlogSkeleton } from "../components/LoadingSkeletons"



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
            {BlogsData.contents.map((blog, index) => {
                return(
                <div>
                    <BlogCard id={blog.id} author={{"name": blog.author?.name ? blog.author.name: '...', email: blog.author.email}} title={blog.title} publishDate={blog.publishDate ? blog.publishDate: ""} content={blog.content} key={index}/>
                </div>
                )
            })}
          </div>: 
          <div className="m-5 w-full">
            <h2>0 Blogs found.</h2>
            <h4>Create your first blog here!</h4>
          </div>
            }
        </div>
      </>
    )
  }
}


export default MyBlogs
