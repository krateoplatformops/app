import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { uiConstants } from '../../../../constants'
import css from './Nav.module.scss'
import { UserContext } from '../../../Context/UserContext'
import DarkLight from './DarkLight/DarkLight'

const Nav = ({ logoutHandler, profile }) => {
  const { menuOpen, toggleMenu } = useContext(UserContext)

  const beCollapsed = () => {
    if (window.innerWidth < 768) {
      toggleMenu()
    }
  }

  return (
    <div className={`${css.NavContainer} ${menuOpen && css.IsOpen}`}>
      <ul className={css.UlNav}>
        {uiConstants.nav.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                isActive ? css.NavLnkActive : css.NavLnk
              }
              onClick={beCollapsed}
            >
              <i className={l.icon}></i> {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <DarkLight />
    </div>
  )
}

export default Nav
