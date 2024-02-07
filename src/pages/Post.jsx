import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_REQUEST':
      return { ...state, loading: true };
    case 'POST_SUCCESS':
      return { ...state, loading: false, post: action.payload, error: '' };
    case 'POST_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'USER_REQUEST':
      return { ...state, loadingUser: true };
    case 'USER_SUCCESS':
      return { ...state, loadingUser: false, user: action.payload, errorUser: '' };
    case 'USER_FAIL':
      return { ...state, loadingUser: false, errorUser: action.payload };
    default:
      return state;
  }
}

const Post = () => {
  const { postId } = useParams()
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    post: {user:{}},
    loadingUser: false,
    errorUser: '',
    user: {}
  })

  const { loading, error, post, loadingUser, errorUser, user } = state;

  const loadPost = async () => {
    dispatch({ type: 'POST_REQUEST' });
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const { data: userData } = await axios.get(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      dispatch({ type: 'POST_SUCCESS', payload: { ...data, user: userData } });
    } catch (error) {
      dispatch({ type: 'POST_FAIL', payload: error.message });
    }
  }



  useEffect(() => {
    loadPost();
  }, [])

  return (
    <section className='main'>

      <section className='post-details'>
        <NavLink to="/">Pack to posts</NavLink>
        {loading ? (
          <article>Loading content please w8...</article>
        ) : error ? (
          <article>Error message: {error}</article>
        ) : (
          <article>
            <h2 className='post-title'>{post.title}</h2>
            <p className='post-content'>{post.body}</p>
          </article>
        )}

      </section>
      <aside className='author'>
        {loading ? (
          <article>Loading content please w8...</article>
        ) : error ? (
          <article>Error message: {error}</article>
        ) : (
          <article>
            <h2 className='post-title'>{`${post.user.username} ${post.user.name}`}</h2>
            <p className='post-content user-email'><span className='author-info'>e-mail:</span> {post.user.email}</p>
            <p className='post-content user-phone'><span className='author-info'>phone:</span> {post.user.phone}</p>
            <p className='post-content user-website'><span className='author-info'>website:</span> {post.user.website}</p>
          </article>
        )}
      </aside>
    </section>
  )
}

export default Post