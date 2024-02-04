import React from 'react'

const Home = () => {
  return (
    <section className='main'>
      <h1>Posts</h1>
      <ul className='posts-list'>
        <li className='post-item'>
          <article>
            <h2>Post 1</h2>
            <p className='post-content'>Post 1 content</p>
          </article>
        </li>

        <li className='post-item'>
          <article>
            <h2>Post 2</h2>
            <p className='post-content'>Post 2 content</p>
          </article>
        </li>
      </ul>
    </section>
  )
}

export default Home