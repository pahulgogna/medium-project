import axios from 'axios'
import { useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

async function CheckToken(token: string, navigate : NavigateFunction) {
    try{
        let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get`, {headers: {Authorization: `Bearer ${token}`}})
        if(res.data.detail){
            navigate('/signin')
        }
        else{
            navigate('/blogs')
        }
    }
    catch{
        localStorage.removeItem('token')
        navigate('/signin')
    }
}

function LandingPage() {
    const navigate = useNavigate()
    let token = localStorage.getItem('token')

    useEffect(() => {
        if(token){
            CheckToken(token, navigate)
        }
        else{
            navigate('/signup')
        }
    }, [])

    return (
        <div>
        </div>
    )
}

export default LandingPage
