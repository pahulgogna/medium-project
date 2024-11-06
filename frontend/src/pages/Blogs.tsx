import { useRecoilValueLoadable } from "recoil"
import BlogCard from "../components/BlogCard"
import { blogAtom } from "../store/atom/atoms"
import { BlogSkeleton } from "../components/LoadingSkeletons"



function Blogs() {

  const BlogsData = useRecoilValueLoadable(blogAtom)
  

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
              <div className="w-11/12">
                {BlogsData.contents.map((blog, index) => {
                  return <BlogCard id={blog.id} author={{"name": blog.author?.name ? blog.author.name: '...'}} title={blog.title} publishDate={blog.publishDate ? blog.publishDate: "31 Oct, 2024"} content={blog.content} key={index}/>
                })}
              </div>
        </div>
      </>
    )
  }
}

export default Blogs
