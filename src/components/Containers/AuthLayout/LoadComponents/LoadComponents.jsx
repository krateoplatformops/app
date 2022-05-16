import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

import {
  templateLoad,
  deploymentLoad,
  endpointLoad,
  dashboardLoad,
  pkgLoad,
  socketInit
} from '../../../../redux/actions'

const LoadComponents = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!props.socket.init) {
      dispatch(socketInit())
    }
  }, [dispatch, props.socket.init])

  useEffect(() => {
    if (!props.template.result && !props.template.skeletonLoading) {
      dispatch(templateLoad())
    }
  }, [dispatch, props.template])

  useEffect(() => {
    if (!props.deployment.result && !props.deployment.skeletonLoading) {
      dispatch(deploymentLoad())
    }
  }, [dispatch, props.deployment])

  useEffect(() => {
    if (!props.endpoint.result && !props.endpoint.skeletonLoading) {
      dispatch(endpointLoad())
    }
  }, [dispatch, props.endpoint])

  useEffect(() => {
    if (!props.dashboard.result && !props.dashboard.loading) {
      dispatch(dashboardLoad())
    }
  }, [dispatch, props.dashboard])

  useEffect(() => {
    if (!props.pkg.result && !props.pkg.skeletonLoading) {
      dispatch(pkgLoad())
    }
  }, [dispatch, props.pkg])

  return <React.Fragment />
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {})(LoadComponents)
