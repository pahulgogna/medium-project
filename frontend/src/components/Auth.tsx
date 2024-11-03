import { UserSchema } from '@pahul100/medium-common'
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Auth({type}: {type: "signup" | "signin"}) {

    const navigate = useNavigate()

    const [postInputs, setPostInputs] = useState<UserSchema>({
        email: '',
        name:'',
        password: ''
    })

    async function sendRequest(): Promise<void>{
        if(postInputs.email && postInputs.password){
            if(type === "signup" && !postInputs.name){
                alert("Please fill all the fields")
                return
            }
            try{
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type === "signup" ? "signup":"signin"}`, postInputs).catch(() => {
                    alert(`Something went wrong while signing ${type === "signup" ? "up": "in"}`)
                })
                if(response){
                    const token = response.data
                    localStorage.setItem('token', token.token)
                    navigate('/blogs')
                }
                return
            }
            catch(e) {
                return
            }
        }
        else{
            alert("Please fill all the fields")
        }
    }

  return (
    <div className='h-screen flex justify-center flex-col'>
        <div className='flex justify-center'>
            <div className='w-1/2'>
                <div className='text-3xl font-extrabold'>
                    {type === "signup"? "Create an account":"Login to your account"}
                </div>
                {
                    type === "signup"
                    ? <div className='text-slate-400'>
                        Already have an account?
                        <Link className='pl-2 text-blue-400 underline' to={"/signin"}>Login</Link>
                    </div>
                    :
                    <div className='text-slate-400'>
                        Don't have an account?
                        <Link className='pl-2 text-blue-400 underline' to={"/signup"}>signup</Link>
                    </div>
                }
                <div>
                    {type === "signup" ?
                        <InputField lable={"Name"} placeholder={"John Doe"} value={postInputs.name ?? ""} onChange={(e) => {
                        setPostInputs(c => ({...c, name: e.target.value}))
                        }}/>
                        :
                        ""
                    }
                    <InputField lable={"Email"} placeholder={"JohnDoe@gmail.com"} value={postInputs.email} onChange={(e) => {
                        setPostInputs(c => ({...c, email: e.target.value}))
                    }}/>
                    <InputField password={true} lable={"Password"} placeholder={"password"} value={postInputs.password} onChange={(e) => {
                        setPostInputs(c => ({...c, password: e.target.value}))
                    }}/>

                    <button onClick={sendRequest} type="button" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup"? "Signup":"Login"}</button>

                </div>

            </div>
        </div>
    </div>
  )
}


export interface InputFieldInterface {
    lable: string,
    placeholder: string,
    value: string,
    password?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({lable, placeholder, onChange, value, password = false} : InputFieldInterface) => {
    return(
        <div className='mt-3'>
            <label htmlFor={lable} className="block mb-2 text-md font-bold text-gray-700">{lable}</label>
            <input value={value} type={password ? "password":"text"} id={lable} className="border text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder={placeholder} required onChange={onChange}/>
        </div>
    )
}


export default Auth
