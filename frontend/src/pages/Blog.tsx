import { useParams } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil"
import { blogAtomFamily } from "../store/atom/atoms"
import FullBlog from "../components/FullBlog"
import AuthorDetails from "../components/AuthorDetails"
import { Loading } from "../components/LoadingSkeletons"

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
        <div className="grid md:grid-cols-12">
          <div className="col-start-1 col-end-9">
            {BlogData.contents &&
              <FullBlog title={BlogData.contents?.title}  content={BlogData.contents?.content} publishDate={BlogData.contents.publishDate}/>
            }
          </div>
          <div className="col-start-9 col-end-13 h-full hidden md:block">
            <AuthorDetails authorName={BlogData.contents?.author.name ? BlogData.contents?.author.name : "Anonymous"}/>
          </div>
        </div>
    )
  }
}

export default Blog
