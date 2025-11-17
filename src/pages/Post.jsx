import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams} from "react-router-dom"

import appwriteService from "../appwrite/config"
import Button from "../components/Button"
import Container from "../components/container/Container"
import parse from "html-react-parser"
import {useSelector } from "react-redux"

function Post() {
  const [post, setPost] = useState(null)
  const [imageError, setImageError] = useState(false)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/")
      }
    })
  }
  return post ? (
    <div className="py-12">
      <Container>
        <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl'>
          {post.featuredImage && !imageError ? (
            <img 
              src={
                post.featuredImage.startsWith("http")
                  ? post.featuredImage
                  : appwriteService.getFilePreview(post.featuredImage)
              } 
              alt={post.title} 
              className='h-[420px] w-full object-cover' 
              onError={(e) => {
                console.error("Image load error for Appwrite file:", post.featuredImage);
                setImageError(true);
              }}
            />
          ) : (
            <div className='flex h-[420px] w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-500'>
              {imageError ? "Image unavailable" : "No image attached"}
            </div>
          )}
          { isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500/80" onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <article className="mx-auto mt-10 max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold text-white">{post.title}</h1>
          <div className="prose prose-invert prose-headings:text-white prose-a:text-blue-400">
            {parse(post.content)}
          </div>
        </article>
      </Container>
    </div>
  ) : null
}

export default Post