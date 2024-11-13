import { useEffect, useState } from "react"
import { InputField } from "./Auth"
import { useRecoilState } from "recoil"
import { blogContentAtom } from "../store/atom/atoms"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loader from "./Loader"

function CreateBlogInput() {

    const navigate = useNavigate()

    const [blogInput, setBlogInput] = useState({
        "title": '',
        "content": '',
        "published": true
    })

    const [loading, setLoading] = useState(false)

    async function sendRequest() {
        setLoading(true)
        if(blogInput.content && blogInput.title){
            try{
                let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, blogInput, 
                    {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                let data = response.data
                if(data.detail){
                    setLoading(false)
                    navigate(`/blog/${data.detail}`)
                    return
                }
                setLoading(false)
                alert("Some error occurred")
                return
            }
            catch{
                setLoading(false)
                alert("Some error occurred")
            }

        }
        else{
            setLoading(false)
            alert("Please fill in all the fields")
        }
    }
    

    return (
        <div className='bg-slate-100 border-r flex justify-center h-full overscroll-none'>

            {loading && <Loader/>}
            <div className='flex flex-col w-full p-20'>
                    <InputField lable="Title" placeholder="Blog Title" onChange={(e) => {
                        setBlogInput(c => ({...c, "title":e.target.value}))
                    }} value={blogInput.title}/>
                    <ContentInput setFunction={setBlogInput} placeholder="*This is your* **Markdown Preview**" lable='Content'/>

                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={sendRequest}>Publish</button>
            </div>

        </div>
  )
}

const ContentInput = ({lable, placeholder, setFunction} 
    : {lable: string, 
    placeholder:string, 
    setFunction: React.Dispatch<React.SetStateAction<{
        title: string;
        content: string;
        published: boolean;
    }>>}) => {
    const [blogContent, setBlogContent] = useRecoilState(blogContentAtom)
    const [rowsCount, setRows] = useState(5)

    useEffect(() => {
        document.getElementById(lable)?.addEventListener('keydown', (e) => {
            if(e.key == "Tab"){
                e.preventDefault()
            }
        })
    }, [])

    return (
        <div className="w-full">
            
            <label htmlFor={lable} className="block mb-2 text-md font-bold text-gray-700 mt-5">{lable}</label>
            <textarea id={lable} rows={rowsCount} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} value={blogContent} onChange={(e) => {
                setBlogContent(e.target.value)
                setFunction(c => ({...c, content: e.target.value}))
                let CurrentRows = e.target.value.split('\n').length <= 20 ? e.target.value.split('\n').length : 20
                setRows(CurrentRows > 5 ? CurrentRows:5)

            }}/>

        </div>
    )
}

export default CreateBlogInput
