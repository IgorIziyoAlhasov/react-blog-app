import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { NavLink } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'POSTS_REQUEST':
      return { ...state, loading: true };
    case 'POSTS_SUCCESS':
      return { ...state, loading: false, posts: action.payload, error: '' };
    case 'POSTS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'USERS_REQUEST':
      return { ...state, loadingUsers: true };
    case 'USERS_SUCCESS':
      return { ...state, loadingUsers: false, users: action.payload, errorUsers: '' };
    case 'USERS_FAIL':
      return { ...state, loadingUsers: false, errorUsers: action.payload };
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    posts: [],
    loadingUsers: false,
    errorUsers: '',
    users: []
  })
  const { loading, error, posts, loadingUsers, errorUsers, users } = state;

  const loadPosts = async () => {
    dispatch({ type: 'POSTS_REQUEST' });
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch({ type: 'POSTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'POSTS_FAIL', payload: error.message });
    }
  }

  const loadUsers = async () => {
    dispatch({ type: 'USERS_REQUEST' });
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch({ type: 'USERS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'USERS_FAIL', payload: error.message });
    }
  }

  useEffect(() => {
    loadPosts();
    loadUsers()
  }, []);


  return (
    <section className='main'>

      <section className='posts'>
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
                    <h2 className='post-title'><NavLink
                      to={`/post/${post.id}`}>
                      {post.title}
                    </NavLink></h2>
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
      <aside className='users'>
        <h2>Authors</h2>
        <ul className='users-list'>
          {loadingUsers ? (
            <article>Loading content please w8...</article>
          ) : errorUsers ? (
            <article>Error message: {errorUsers}</article>
          ) : users.length === 0 ? (
            <article>No users found</article>
          ) : (
            users.map(user => (
              <li key={user.id} className='user-item'>
                <article>
                  <h3>{user.name}</h3>
                </article>
              </li>
            ))
          )}
        </ul>
      </aside>

    </section>
  )
}

export default Home