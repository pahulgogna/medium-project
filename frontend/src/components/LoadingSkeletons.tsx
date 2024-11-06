

export function BlogSkeleton() {

    return (

    <div className="w-11/12">
    <div className='pl-20 pt-5 pb-5 border-b animate-pulse'>
            <div className='flex'>
                    <svg className="w-8 h-8 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <div className="flex justify-center">
                        <div className="h-2.5 bg-gray-300 rounded-full mt-1 ml-2 min-w-[150px] max-w-[540px]"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full mt-1 ml-2 min-w-[70px] max-w-[70px]"></div>

                    </div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-[540px]"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-[540px]"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-[540px]"></div>
    </div>
</div>

)}


export function UserDataSkeleton () {
    return (
        <div className="animate-pulse">
            <div className='flex justify-center pt-10 text-3xl font-bold'>
                <div className="h-3.5 bg-gray-300 rounded-full mt-5 min-w-[150px]"></div>
            </div>
        
        <div className='flex justify-center pt-10'>
            <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
        </div>

        <div className='flex justify-center pt-4 text-xl font-semibold'>
                <div className="h-2.5 bg-gray-300 rounded-full mt-5 min-w-[150px]"></div>
        </div>
            <div className='flex'>
                   

            </div>
        </div>
    )
}


export function Loading() {
    return (
      <div className="font-bold text-2xl grid md:grid-cols-12">
        <div className='px-20 pt-5 pb-5 animate-pulse col-start-1 col-end-9'>
            <div className="h-6 bg-gray-300 rounded-full mt-5 max-w-[500px]"></div>
            <h5 className="border-b pr-10 pb-2">
                <div className="h-4 bg-gray-300 rounded-full mt-5 max-w-[250px]"></div>
            </h5>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-3.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-1 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-1.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-3.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-3.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-3.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-1.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
            <div className="h-1.5 bg-gray-300 rounded-full mt-5 max-w-full"></div>
        </div>
        <div className="col-start-9 col-end-13 h-full hidden md:block">
            <UserDataSkeleton/>
        </div>
  
      </div>
    )
  }
