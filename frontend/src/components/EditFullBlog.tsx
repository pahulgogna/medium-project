import { useEffect, useState } from "react"
import { RenderMarkDown } from "./CreateBlogPreview"
import axios from "axios"
import ReactDOMServer from 'react-dom/server';
import Loader from "./Loader";


function ContentInput ({lable, placeholder, value, setFunction} 
    : {lable: string, 
    placeholder:string,
    value: string,
    setFunction: React.Dispatch<React.SetStateAction<string>>}) {

        const [rowsCount, setRows] = useState(value.split('\n').length <= 20 ? value.split('\n').length : 20)

        
        return (

            <div className="">
                <label htmlFor={lable} className="block mb-2 text-md font-bold text-gray-700 mt-5">{lable}</label>
                <textarea id={lable} rows={rowsCount} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} value={value} onChange={(e) => {
                    setFunction((e.target.value))
                    let CurrentRows = e.target.value.split('\n').length <= 20 ? e.target.value.split('\n').length : 20
                    setRows(CurrentRows > 5 ? CurrentRows:5)
                }}/>

            </div>
        )
}


function ToggleButton({value, setValue, onTrueLabel = "", onFalseLabel = ""} 
    : {value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean | undefined>>, onTrueLabel?: string, onFalseLabel?: string}
): React.ReactNode {
    return (
        <label className="inline-flex items-center cursor-pointer mb-2">
            <span className="mr-2 text-sm font-medium text-gray-900 ">{value ? onTrueLabel : onFalseLabel}</span>
            <input type="checkbox" checked={value}className="sr-only peer" onChange={() => {
                            setValue(x => !x)
                        }}/>
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}


function EditFullBlog({
    title,
    content,
    publishDate,
    published,
    id
}: {title: string, content: string, publishDate:string, published?: boolean, id: string}) {


    const [newTitle, setNewTitle] = useState(title)
    const [newBody, setNewBody] = useState(content)
    const [isPublished, setIsPublished] = useState(published)
    
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const titleElement = document.getElementById('title');
        const contentElement = document.getElementById('content');
        if (titleElement) {
            titleElement.innerText = title;
        }
        if(contentElement){
            contentElement.innerHTML = ReactDOMServer.renderToString(content)
        }

    },[title, content])

    async function sendRequest(){

        if(title !== newTitle || content !== newBody || isPublished !== published){
            setLoading(true)

            let tempData = {
                "title": newTitle,
                "content": newBody,
                "publishDate": publishDate,
                "published": isPublished,
                "id": id
            }

            try{
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, tempData , {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                setLoading(false)
                window.location.reload()
            }
            catch{
                setLoading(false)
                alert("An error occurred while trying to save your data")
            }

        }
        else{

        }
    }

  return (
    <div className='w-full h-full pr-10 pl-10 pt-10 pb-10'>
        <div className="flex justify-end w-full">
        {loading && <Loader/>}
            <div className="flex justify-center flex-col">
                <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-0 focus:ring-gray-300 font-medium rounded-lg text-sm py-1.5 px-2.5 mb-5 w-full"
                onClick={() => {
                    sendRequest()
                }}>
                    Publish
                </button>
                <ToggleButton value={isPublished ?? false} setValue={setIsPublished} onFalseLabel="Public" onTrueLabel="Public"/>
            </div>
        </div>
        <h1 className="pr-10">
            <div id="title" className="py-2 rounded-md focus:outline-none text-3xl sm:text-4xl font-bold overflow-auto" contentEditable="true"
            onInput={(e) => {
                setNewTitle(e.currentTarget.innerHTML)
            }}/>
        </h1>
        <h5 className="pt-4 border-b pr-10">
            Published on: {publishDate}
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-full bg-slate-100 rounded-lg mt-3 w-full p-10 pt-0">
                <ContentInput setFunction={setNewBody} value={newBody} placeholder="" lable='Content'/>
            </div>

            <div id="contentPreview" className="pr-5 pt-2 pl-5 text-slate-600 focus:outline-none border-0">
                {RenderMarkDown(newBody)}
            </div>
        </div>
        
        
    </div>
  )
}

export default EditFullBlog