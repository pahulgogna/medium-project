import { useParams } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil"
import { blogAtomFamily } from "../store/atom/atoms"
import FullBlog from "../components/FullBlog"
import { Loading } from "./Blogs"
import AuthorDetails from "../components/AuthorDetails"

function Blog() {

  const {id} = useParams()

  const BlogData = useRecoilValueLoadable(blogAtomFamily(id ? id : ''))

  if(BlogData.state == "loading"){
    return (
      <Loading/>
    )
  }
  else if(BlogData.state == "hasValue"){
    return (
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-end-9">
            {BlogData.contents &&
              <FullBlog title={BlogData.contents?.title}  content={BlogData.contents?.content} publishDate={BlogData.contents.publishDate}/>
            }
          </div>
          <div className="col-start-9 col-end-13 h-full">
            <AuthorDetails authorName={BlogData.contents?.author.name ? BlogData.contents?.author.name : "Anonymous"}/>
          </div>
        </div>
    )
  }
}

export default Blog
