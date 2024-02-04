import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './../styles/nav-panel.scss'
import { ThemeContext } from '../ThemeContext';

const NavigationPanel = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className='header'>
      <nav className='header-nav'>
        <NavLink
          to="/"
          className={`header-nav-item`}> {/* ${({ isActive }) => (isActive ? 'menu-item-active' : '')} */}
          Home
        </NavLink>

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