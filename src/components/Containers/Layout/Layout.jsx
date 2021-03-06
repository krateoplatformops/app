import React, { useEffect, Fragment } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import NotificationQueue from '../../UI/NotificationQueue/NotificationQueue'
import CheckUser from './CheckUser/CheckUser'
import Navigator from './Navigator/Navigator'
import ReduxLoader from './ReduxLoader/ReduxLoader'
import LoadComponents from './LoadComponents/LoadComponents'

const Layout = () => {
  let location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Fragment>
      <CheckUser />
      <LoadComponents />
      <Navigator />
      <Outlet />
      <NotificationQueue />
      <ReduxLoader />
    </Fragment>
  )
}

export default Layout
