import React, {useEffect,useState} from 'react'

import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post ,setPost]=useState(null);
    const {slug}=useParams();
    const navigate =useNavigate();


    useEffect(()=>{
        if (slug){
            appwriteService.getPost(slug).then((post)=>{
                if (post){
                    setPost(post);
                }
                
            })
        }else{
            navigate("/")
                    
                }
    },[slug , navigate])
  return post? (
    <div className='py-12'> 
            <Container>
                <div className="mb-8">
                    <p className="text-sm uppercase tracking-[0.5em] text-blue-200">Edit</p>
                    <h1 className="text-4xl font-semibold text-white">Refresh your story</h1>
                    <p className="text-slate-400">Update images, copy, and publishing status with confidence.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-xl">
                    <PostForm post={post}/>
                </div>
                
                </Container>
    </div>
  ) : (
    <div className="py-12">
        <Container>
            <div className="rounded-3xl border border-white/10 p-12 text-center text-slate-400">
                Loading post…
            </div>
        </Container>
    </div>
  )
}

export default EditPost