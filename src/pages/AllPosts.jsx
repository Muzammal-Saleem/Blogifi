import { useState, useEffect } from "react"
import React  from 'react'
import appwriteService  from "../appwrite/config"
import { PostCard, Container } from '../components'

function AllPosts() {
    const [posts, setPosts]=useState([]);


    useEffect(()=>{
        appwriteService.getposts([]).then((posts)=>{
            if (posts){
                setPosts(posts.documents)
            }
        })
    },[])

  return (
    <div className="py-12">
        <Container>
            <div className="mb-8 flex flex-col gap-2">
                <p className="text-sm uppercase tracking-[0.5em] text-blue-200">Discover</p>
                <h1 className="text-4xl font-semibold text-white">All stories</h1>
                <p className="text-slate-400">Browse everything the Blogifi community is publishing.</p>
            </div>
            {posts.length === 0 ? (
                <div className="rounded-3xl border border-white/10 p-12 text-center text-slate-400">
                    No posts yet. Start by creating your first story.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post)=>(
                        console.log("post", post),
                        <PostCard key={post.$id} {...post}/>
                    ))}
                </div>
            )}
        </Container>
    </div>
  )
}

export default AllPosts