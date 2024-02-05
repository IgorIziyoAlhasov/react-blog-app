import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { NavLink } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_REQUEST':
      return { ...state, loading: true };
    case 'POST_SUCCESS':
      return { ...state, loading: false, posts: action.payload, error: '' };
    case 'POST_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    posts: []
  })
  const { loading, error, posts } = state;

  const loadPosts = async () => {
    dispatch({ type: 'POST_REQUEST' });
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch({ type: 'POST_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'POST_FAIL', payload: error.message });
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);


  return (
    <section className='main'>
      <h1>Posts</h1>
      {loading ?
        (
          <article>Loading content please w8...</article>
        ) :
        error ? (
          <article>Error message: {error}</article>
        ) : posts.length === 0 ? (
          <article>No posts found</article>
        ) : (
          <ul className='posts-list'>
            {posts.map(post => (
              <li key={post.id} className='post-item'>
                <article>
                  <h2>{post.title}</h2>
                  <p className='post-content'>{post.body}</p>
                  <p className='post-content'><NavLink
                    to={`/post/${post.id}`}>
                    Post details
                  </NavLink></p>
                </article>
              </li>
            ))}

          </ul>
        )}

    </section>
  )
}

export default Home