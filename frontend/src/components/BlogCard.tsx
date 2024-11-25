import { Link } from "react-router-dom"
import { RenderMarkDown } from "./CreateBlogPreview"
import { useRecoilValueLoadable } from "recoil"
import { userAtom } from "../store/atom/atoms"
import { useMemo } from "react"


export interface BlogCardInterface {
    id: string,
    author: {
        "name": string, 
        "email": string
    },
    title: string,
    content: string,
    publishDate: string,
    clicks?: number,
    published?: boolean
}

export function EditIcon({className}: {className?: string}) {
    return (
        <div className={className}>
            <svg width="20" height="20"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor" strokeWidth={"2"} strokeLinecap="round"   strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
        </div>
    )
}


function BlogCard({
        id,
        author,
        title,
        content,
        publishDate,
    }: BlogCardInterface,  {className}: {className?: string} ) {

        const user = useRecoilValueLoadable(userAtom)

        const minuteRead = useMemo(() => {
            return content.split(' ').length > 238 ? `${Math.ceil(content.split(' ').length/238)} minutes read` : '< 1 minute read'
        }, [content])

        const contentPreview = useMemo(() => {
            return content.split('\n').length > 2? RenderMarkDown(content.split('\n').slice(0, 2).join('\n') + "..."):RenderMarkDown(content)
        }, [content])

    return (
        <div>
            <div className='p-5 border-b border-slate-200'>
                <div className="flex">
                    <div className='flex mb-3 w-full'>
                        <div className='flex justify-center flex-col'>
                            <Avatar name={author?.name ? author?.name : "Name"}/> 
                        </div>
                        <div className='mx-1 font-light'>
                            {author?.name} - 
                        </div>
                        <div className='font-thin text-slate-400'>
                            {publishDate}
                        </div>
                    </div>
                    <div className="flex justify-end mx-2">
                        {user.contents && user.state === "hasValue" && 
                        author.email === user.contents.email 
                        ?
                        <Link to={`/blogs/edit/${id}`}>
                            <EditIcon className=" cursor-pointer"/> 
                        </Link>
                        : null
                        }
                    </div>
                </div>
                <Link to={`/blogs/${id}`} className={`${className}  cursor-pointer`}>
                        <div className='font-bold text-2xl my-2'>
                            {title}
                        </div>
                        <div className='text-slate-600 font-medium text-base'>
                            {contentPreview}
                        </div>
                        <div className='text-slate-500 font-light text-sm mt-4 mx-1'>
                            {minuteRead}
                        </div>
                </Link>
            </div>
        </div>
    )
}


export const Avatar = ({name, size = "6"}: {name: string, size?: string}) => {
    return(
        <div className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`text-${size === "6"?"xs":"base"} font-medium text-gray-600 dark:text-gray-300 flex justify-center flex-col`}>
                {name[0]}
            </span>
        </div>
    )
}


export default BlogCard
