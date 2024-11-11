import Markdown from 'react-markdown'
import { useRecoilValue } from 'recoil'
import { blogContentAtom } from '../store/atom/atoms'
import remarkGfm from 'remark-gfm'


export function RenderMarkDown(content: string){
    return (
        <Markdown className={'tracking-wider leading-7'} remarkPlugins={[remarkGfm]}
        components={{
            h1: ({ node, ...props }) => (
                <h1 {...props} className="leading-loose">
                    {props.children}
                </h1>
            ),
            h2: ({ node, ...props }) => (
                <h2 {...props} className="leading-loose">
                    {props.children}
                </h2>
            ),
            h3: ({ node, ...props }) => (
                <h3 {...props} className="leading-loose">
                    {props.children}
                </h3>
            ),
            hr: () => <hr className="my-8 border-t-2 border-gray-300" />,
            a: ({node, ...props}) => (
                <a
                    {...props} target='_blank'
                    style={{ color: '#3498db', textDecoration: 'none' }} // Customize link color here
                >
                    {props.children}
                </a>
            )
        }}
        >
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
