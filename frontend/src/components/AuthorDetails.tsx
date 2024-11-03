import { Avatar } from './BlogCard'

function AuthorDetails({authorName} : {authorName: string}) {
  return (
    <div>
        <div className='flex justify-center pt-10 text-3xl font-bold'>
            Author
        </div>
        <div className='flex justify-center pt-10'>
            <Avatar name={authorName}/>
        </div>
        <div className='flex justify-center pt-4 text-xl font-semibold'>
            {authorName}
        </div>
    </div>
  )
}

export default AuthorDetails
