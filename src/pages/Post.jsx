import React from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
  const { postId } = useParams()
  return (
    <section className='main'>
      <article>
        <h2>{postId}</h2>
        <p className='post-content'>Post {postId} content</p>
      </article>
    </section>
  )
}

export default Post