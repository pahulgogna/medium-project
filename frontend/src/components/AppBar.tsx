import { Suspense } from 'react'
import { Avatar } from './BlogCard'
import { useRecoilValueLoadable } from 'recoil'
import { userAtom } from '../store/atom/atoms'
import { Link } from 'react-router-dom'

function AppBar() {
    
    const user = useRecoilValueLoadable(userAtom)

    if(user.state == "loading"){
        return (
          <div className='flex justify-between mt-0 w-full h-16 bg-slate-200'>
              <Link to={"/"} className='flex justify-center flex-col pl-5 font-semibold text-xl cursor-pointer'>
                      Medium
              </Link>
          </div>
        )

    }
    else if(user.state === "hasValue"){     
        const userData : {
            email:string,
            name: string,
            password: string,
            id:string
        } = user.contents
        
          return (
            <div className='flex justify-between mt-0 w-full h-16 bg-slate-200'>
                <Link to={"/"} className='flex justify-center flex-col pl-5 font-semibold text-xl cursor-pointer'>
                        Medium
                </Link>
                {userData.id && 
                    <div className='flex justify-right pr-5'>
                        <div className='flex justify-center flex-col p-4'>
                            <Link to={"/blogs/create"} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1.5 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Create</Link>
                        </div>
                        <div className='flex justify-center flex-col'>
                            <Suspense fallback={<Avatar name='.'/>}>
                                <Avatar name={userData.name ? userData.name : userData.email} size='9'/>
                            </Suspense>
                        </div>
                    </div>
                }
            </div>
          )
    }

}

export default AppBar
