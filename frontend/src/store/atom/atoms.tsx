import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { BlogCardInterface } from "../../components/BlogCard";


interface BlogsResponseInterface {
    data : BlogCardInterface[]
}


export const userAtom = atom({
    key: 'useratom',
    default: selector({
        key:'userSelector',
        get: async () => {
            try{
                let userData = localStorage.getItem('token')
                let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get`,
                        {headers: {Authorization: `Bearer ${userData}`}
                    })
                let data = response.data
                return data
            }
            catch{
                return null
            }
        }
    })
})

export const blogAtom = atom({
    key: 'Blog',
    default: selector({
        key:'BlogSelector',
        get: async () => {
            try{
                let userData = localStorage.getItem('token')
                let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`,
                        {headers: {Authorization: `Bearer ${userData}`}
                    })
                let data: BlogsResponseInterface = response.data
                return data.data
            }
            catch {
                return []
            }
        }
    })
})

export const MyBlogsAtom = atom({
    key: 'myBlogs',
    default: selector({
        key:'myBlogsSelector',
        get: async () => {
            try{
                let userData = localStorage.getItem('token')
                let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/my`,
                        {headers: {Authorization: `Bearer ${userData}`}
                    })
                let data: BlogsResponseInterface = response.data
                return data.data
            }
            catch{
                return []
            }
        }
    })
})

export const blogAtomFamily = atomFamily({
    key:"blogFamily",
    default: selectorFamily({
        key:"blogSelectorFamily",
        get: id => async () => {
            if(!id){
                return null
            }
            try{
                const Blog = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${String(id)}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                let data: BlogCardInterface =  Blog.data.data
                return data
            }
            catch{
                return null
            }
        }
    })
})

export const blogContentAtom = atom({
    key:"blogContentAtom",
    default: ""
})

