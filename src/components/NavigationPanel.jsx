import React from 'react'
import { NavLink } from 'react-router-dom'
import './../styles/nav-panel.scss'

const NavigationPanel = () => {

  return (
    <header className='header'>
      <nav className='header-nav'>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'menu-item-active header-nav-item' : 'header-nav-item'
          }>
          Home
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? 'menu-item-active header-nav-item' : 'header-nav-item'
          }>
          Login
        </NavLink>

      </nav>

    </header>
  )
}

export default NavigationPanel