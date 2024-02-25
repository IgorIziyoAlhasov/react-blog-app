import React, { useContext, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './../styles/nav-panel.scss'
import { ThemeContext } from '../ThemeContext';

const NavigationPanel = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [query, setQuery] = useState('')
  const hystory = useNavigate();

  const queryInput = useRef()

  const handlePostsFilter = (event) => {
    event.preventDefault();
    hystory(`/search/${query}`);
  }



  return (
    <header className='header'>
      <nav className='header-nav'>
        <NavLink
          to="/"
          className={`header-nav-item`}> {/* ${({ isActive }) => (isActive ? 'menu-item-active' : '')} */}
          Home
        </NavLink>

        <div className='posts-filter-control header-nav-item'>
          <input
            className='posts-filter-input'
            type="text"
            placeholder='Filter posts...'
            ref={queryInput}
            onChange={e => setQuery(e.target.value)} />
          <button className='posts-filter-submit' onClick={handlePostsFilter}>Filter</button>
        </div>

        <NavLink
          to="/login"
          className={`header-nav-item`}> {/* ${({ isActive }) => (isActive ? 'menu-item-active' : '')} */}
          Login
        </NavLink>

      </nav>
      <div className="controls">
        <button className='theme-toggler' onClick={toggleTheme}>Theme: {theme === 'light' ? 'dark' : 'light'}</button>
      </div>

    </header>
  )
}

export default NavigationPanel