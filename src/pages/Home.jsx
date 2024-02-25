import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { NavLink, useParams } from 'react-router-dom';

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
    case 'USER_SUCCESS':
      return { ...state, loadingUsers: false, user: action.payload, errorUsers: '' };
    case 'USERS_FAIL':
      return { ...state, loadingUsers: false, errorUsers: action.payload };
    default:
      return state;
  }
}

const Home = () => {
  const { query, userId } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    posts: [],
    loadingUsers: false,
    errorUsers: '',
    users: [],
    user: {}
  })
  const { loading, error, posts, loadingUsers, errorUsers, users, user } = state;

  const loadPosts = async () => {
    dispatch({ type: 'POSTS_REQUEST' });
    try {
      const { data } = await axios.get(
        userId ?
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}` :
          `https://jsonplaceholder.typicode.com/posts`
      );
      const filteredPosts = query ?
        data.filter(post =>
          post.title.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
          post.body.toLowerCase().indexOf(query.toLowerCase()) >= 0) :
        data
      dispatch({ type: 'POSTS_SUCCESS', payload: filteredPosts });
    } catch (error) {
      dispatch({ type: 'POSTS_FAIL', payload: error.message });
    }
  }

  const loadUsers = async () => {
    dispatch({ type: 'USERS_REQUEST' });
    try {
      const { data } = await axios.get(
        userId ?
          `https://jsonplaceholder.typicode.com/users/${userId}` :
          `https://jsonplaceholder.typicode.com/users`
      );
      dispatch({
        type: userId ? 'USER_SUCCESS' : 'USERS_SUCCESS',
        payload: data
      });
    } catch (error) {
      dispatch({ type: 'USERS_FAIL', payload: error.message });
    }
  }

  useEffect(() => {
    loadPosts();
    loadUsers()
  }, [query, userId]);


  return (
    <section className='main'>

      <section className='posts'>
        <h1>
          {
            query ? `Results for "${query}"` :
              userId ? `${user.name}'s posts` :
                `Posts`
          }
        </h1>
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


        {loadingUsers ? (
          <article>Loading content please w8...</article>
        ) : errorUsers ? (
          <article>Error message: {errorUsers}</article>
        ) : users.length === 0 ? (
          <article>No users found</article>
        ) : (
          userId ? (
            <article>
              <h3>{user.name}</h3>
              <ul className='user-info'>
                <li>
                  Email: {user.email}
                </li>
                <li>
                  Phone: {user.phone}
                </li>
                <li>
                  Website: {user.website}
                </li>
              </ul>
            </article>
          ) : (
            <ul className='users-list'>
              <h2>Authors</h2>
              {users.map(user => (
                <li key={user.id} className='user-item'>
                  <NavLink to={`/user/${user.id}`}>
                    <h3>{user.name}</h3>
                  </NavLink>
                </li>
              ))}
            </ul>
          )

        )}

      </aside>

    </section>
  )
}

export default Home