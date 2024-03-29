import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Menu from './Menu/Menu'
import Profile from './Profile/Profile'
import Endpoints from './Endpoints/Endpoints'
import Follower from '../../UI/Follower/Follower'
import ErrorBoundary from '../../Containers/ErrorBoundary/ErrorBoundary'
import Components from './Components/Components'
import Secrets from './Secrets/Secrets'
import Authentication from './Authentication/Authentication'

const Settings = () => (
  <ul className="ul-double-view mt">
    <li className="li-menu">
      <Follower>
        <Menu />
      </Follower>
    </li>
    <li className="li-content">
      <Routes>
        <Route path="/*">
          <Route
            index
            element={
              <ErrorBoundary>
                <Profile />
              </ErrorBoundary>
            }
          />
          <Route
            path="endpoints"
            element={
              <ErrorBoundary>
                <Endpoints />
              </ErrorBoundary>
            }
          />
          <Route
            path="components"
            element={
              <ErrorBoundary>
                <Components />
              </ErrorBoundary>
            }
          />
          <Route
            path="secrets"
            element={
              <ErrorBoundary>
                <Secrets />
              </ErrorBoundary>
            }
          />
          <Route
            path="authentication"
            element={
              <ErrorBoundary>
                <Authentication />
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </li>
  </ul>
)

export default Settings
