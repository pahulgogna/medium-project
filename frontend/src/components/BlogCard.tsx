import { Link } from "react-router-dom"
import { RenderMarkDown } from "./CreateBlogPreview"


export interface BlogCardInterface {
    id: string,
    author: {"name": string},
    title: string,
    content: string,
    publishDate: string,
    clicks?: number
}

function BlogCard({
        id,
        author,
        title,
        content,
        publishDate
    }: BlogCardInterface ) {
    return (
        <Link to={`/blog/${id}`}>
            <div className='p-5 border-b border-slate-200 cursor-pointer'>
                <div className='flex mb-3'>
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
                <div className='font-bold text-2xl my-2'>
                    {title}
                </div>
                <div className='text-slate-600 font-medium text-base'>
                    {content.split('\n').length > 2? RenderMarkDown(content.split('\n').slice(0, 2).join('\n') + "..."):RenderMarkDown(content)}
                </div>
                <div className='text-slate-500 font-light text-sm mt-4 mx-1'>
                    {content.split(' ').length > 238 ? `${Math.ceil(content.split(' ').length/238)} minutes` : '< 1 minute '} read
                </div>
            </div>
        </Link>
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
