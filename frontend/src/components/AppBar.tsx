import { Suspense, useState } from 'react'
import { Avatar } from './BlogCard'
import { useRecoilValueLoadable } from 'recoil'
import { userAtom } from '../store/atom/atoms'
import { Link, useNavigate } from 'react-router-dom'


function UserSettings({name, email} : {name: string, email: string}) {
    const navigate = useNavigate()
    return (
        <div className='bg-slate-300/95 border w-[150px] h-[200px] absolute right-8 mt-14 z-10 rounded flex flex-col border-black'>
            <div className='border-b border-black h-10 flex flex-col justify-center'>
                <div className='flex justify-center'>
                    {name.length < 13 ? name : name.substring(0, 13) + '...'}
                </div>
            </div>
            <div className='border-b border-black h-10 flex flex-col justify-center'>
                <div className='flex justify-center'>
                    {email.length < 13 ? email : email.substring(0, 13) + '...'}
                </div>
            </div>
            <div className='h-15 flex flex-col justify-center'>

                <div className='border-b py-3 border-black flex justify-center'>
                    <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-1.5 w-1/2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => {
                        navigate('/blogs/my')
                    }}>My Blogs</button>
                </div>

                <div className='pt-4 flex justify-center'>
                    <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-1.5 w-1/2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => {
                        localStorage.clear()
                        window.location.href = '/'
                    }}>Logout</button>
                </div>
            </div>
        </div>
    )
}


function AppBar() {
    
    const user = useRecoilValueLoadable(userAtom)

    const [userWindow, setUserWindow] = useState(false)

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
            <div className='bg-slate-200 w-full'>
                <div className='flex justify-between mt-0 w-full h-16 bg-slate-200'>
                    <Link to={"/"} className='flex justify-center flex-col pl-5 font-semibold text-xl cursor-pointer'>
                            Medium
                    </Link>
                    {userData && userData.id &&
                        <div className='flex justify-right pr-5'>
                            <div className='flex justify-center flex-col p-4'>
                                <Link to={"/blogs/create"} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-1.5 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Create</Link>
                            </div>
                            <div className='flex justify-center flex-col'>
                                <Suspense fallback={<Avatar name='.'/>}>
                                <div className='cursor-pointer' onClick={() => {
                                    setUserWindow(c => !c)
                                }}>
                                    <Avatar name={userData.name ? userData.name : userData.email} size='9'/>
                                </div>
                                </Suspense>
                            </div>
                        </div>
                    }
                {userWindow ? <UserSettings name={userData.name} email={userData.email}/> : null}
                </div>


            </div>
          )
        }
        
}

export default AppBar
