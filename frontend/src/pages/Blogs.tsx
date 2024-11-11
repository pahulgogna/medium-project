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
                {[...BlogsData.contents].sort((a, b) => {
                  if(a.clicks && b.clicks){
                    return  b.clicks / getDateDiff(b.publishDate) - a.clicks / getDateDiff(a.publishDate)
                  }
                  else{
                    return getDateDiff(a.publishDate) - getDateDiff(b.publishDate)
                  }
                }).map((blog, index) => {
                  return(
                    <div>
                      <BlogCard id={blog.id} author={{"name": blog.author?.name ? blog.author.name: '...'}} title={blog.title} publishDate={blog.publishDate ? blog.publishDate: "31 Oct, 2024"} content={blog.content} key={index}/>
                    </div>
                  )
                  
                })}
              </div>
        </div>
      </>
    )
  }
}


function getDateDiff(date: string){
  let InDate = new Date(date)
  let now  = new Date()
  let diff = Math.ceil((now.getTime() - InDate.getTime()) / 87400000)
  return diff
}


export default Blogs
