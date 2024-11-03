import { RenderMarkDown } from "./CreateBlogPreview"

function FullBlog({
    title,
    content,
    publishDate
}: {title: string, content: string, publishDate:string}) {
  return (
    <div className='w-full h-full pl-10 pt-10'>
        <h1 className="pr-10">
            {title}
        </h1>
        <h5 className="pt-4 border-b pr-10">
            Published on: {publishDate}
        </h5>
        <div className="pt-5 pr-10 text-slate-600">
            {RenderMarkDown(content)}
        </div>
    </div>
  )
}

export default FullBlog
