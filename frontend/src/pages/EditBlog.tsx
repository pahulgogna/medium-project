import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil"
import { blogAtomFamily, userAtom } from "../store/atom/atoms"
import { BlogSkeleton, Loading, LoadingBlogEditPage } from "../components/LoadingSkeletons"
import Loader from "../components/Loader"
import EditFullBlog from "../components/EditFullBlog"


function EditBlog() {
    
    const {id} = useParams()

    const BlogData = useRecoilValueLoadable(blogAtomFamily(id ? id : ''))

    const user = useRecoilValueLoadable(userAtom)

    const navigate = useNavigate()

    if(user.state === "loading"){
        return (
            <Loader/>
        )
    }
    else if (user.state === "hasValue"){
        if(BlogData.state === "loading"){
            return (
                <LoadingBlogEditPage/>
            )
        }
        else if(BlogData.state == "hasValue"){
            
            if(user.contents && user.contents.email === BlogData.contents?.author.email){
                return (
                    <div className="overflow-hidden">
                        {BlogData.contents &&
                        <EditFullBlog id={BlogData.contents.id} published={BlogData.contents.published} title={BlogData.contents?.title}  content={BlogData.contents?.content} publishDate={BlogData.contents.publishDate}/>
                        }
                    </div>
                )
            }
            navigate(`/blogs/${id}`)
    }
}}

export default EditBlog