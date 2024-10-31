interface BlogCardInterface {
    authorName: string,
    title: string,
    content: string,
    publishDate: string
}

function BlogCard({
        authorName,
        title,
        content,
        publishDate
    }: BlogCardInterface ) {
    return (
        <div className='p-5 border-b border-slate-200'>
            <div className='flex mb-3'>
                <div className='flex justify-center flex-col'>
                    <Avatar name={authorName}/> 
                </div>
                <div className='mx-1 font-light'>
                    {authorName} - 
                </div>
                <div className='font-thin text-slate-400'>
                    {publishDate}
                </div>
            </div>
            <div className='font-bold text-2xl my-2'>
                {title}
            </div>
            <div className='text-slate-600 font-medium text-base'>
                {content.split(' ').length > 100 ? content.split(' ').slice(0, 50).join(' ') + "...":content}
            </div>
            <div className='text-slate-500 font-light text-sm mt-4 mx-1'>
                {content.split(' ').length > 238 ? `${Math.ceil(content.split(' ').length/238)} minutes` : '< 1 minute '} read
            </div>
        </div>
    )
}


const Avatar = ({name}: {name: string}) => {
    return(
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {name[0]}
            </span>
        </div>
    )
}


export default BlogCard
