import Markdown from 'react-markdown'
import { useRecoilValue } from 'recoil'
import { blogContentAtom } from '../store/atom/atoms'
import remarkGfm from 'remark-gfm'


export function RenderMarkDown(content: string){
    return (
        <Markdown remarkPlugins={[remarkGfm]}>
            {content}
        </Markdown>
    )
}


function CreateBlogPreview() {

    const BlogContent = useRecoilValue(blogContentAtom)

    return (
        <div>
            <div className='text-4xl font-semibold w-full h-20 bg-slate-100 flex justify-center flex-col p-4'>
                    Preview
            </div>
            <div className='p-5'>
                {BlogContent ? RenderMarkDown(BlogContent): RenderMarkDown("*This is your* **Markdown Preview**")}
            </div>
        </div>
    )
}

export default CreateBlogPreview
