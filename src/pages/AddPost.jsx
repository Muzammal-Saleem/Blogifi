import React from 'react'
import { PostForm ,Container} from '../components'


function AddPost() {
  return (
    <div className='py-12'>
        <Container>
            <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.5em] text-blue-200">Create</p>
                <h1 className="text-4xl font-semibold text-white">Write a new story</h1>
                <p className="text-slate-400">Draft, edit, and publish with Blogifi’s calm workspace.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-xl">
                <PostForm/>
            </div>
        </Container>
    </div>
  )
}

export default AddPost