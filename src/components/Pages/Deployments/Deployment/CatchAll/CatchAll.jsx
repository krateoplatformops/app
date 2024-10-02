import React, { useCallback, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'

import { pluginFetch, pluginDeleteKey } from '../../../../../redux/actions'
import Error from '../../../../UI/Error/Error'
import ArgoCD from './ArgoCD/ArgoCD'
import Documentation from './Documentation/Documentation'
import Loader from '../../../../UI/Loader/Loader'
import Pipelines from './Pipelines/Pipelines'
import Kubernetes from './Kubernetes/Kubernetes'
import Keptn from './Keptn/Keptn'
import ArgoEvents from './ArgoEvents/ArgoEvents'
import Codequality from './Codequality/Codequality'
import Capi from './Capi/Capi'
import ErrorBoundary from '../../../../Containers/ErrorBoundary/ErrorBoundary'
import Terminal from './Terminal/Terminal'
import { pluginHelper } from '../../../../../helpers'

const CatchAll = ({ deploy, params, plugin }) => {
  const dispatch = useDispatch()
  const [detailsKey, setDetailsKey] = useState('')

  const pp = deploy.spec.plugins.find(
    (x) => x.name.replace(/\s/g, '-') === params['*']
  )

  const pKey = pp ? `${pp.type}-${pp.name}` : null

  const detailsCallHandler = useCallback(
    ({ url, key, method, data, message }) => {
      if (key) {
        setDetailsKey(key)
      }

      if (pKey.startsWith('terminal')) return
      dispatch(
        pluginFetch({
          method: method || 'get',
          url,
          data,
          key,
          message
        })
      )
    },
    [dispatch, pKey]
  )

  const detailsClearHandler = () => {
    dispatch(pluginDeleteKey({ key: detailsKey }))
    setDetailsKey('')
  }

  useEffect(() => {

    console.log('pKey-log:', { pKey });
    console.log('pp-log:', { pp });
    console.log('deploy-log:', { deploy });
    console.log('plugin-log:', { plugin });

    if (pKey.startsWith('terminal') || pp?.type === 'argoevents') return
    pKey &&
      !plugin.data[pKey] &&
      dispatch(
        pluginFetch({
          url: pluginHelper.createCallUrl(pp, deploy),
          key: pKey
        })
      )
  }, [dispatch, pKey, plugin.data, pp, deploy])

  useEffect(() => {
    return () =>
      pKey &&
      dispatch(
        pluginDeleteKey({
          key: pKey
        })
      )
  }, [dispatch, pKey])

  if (!pKey) {
    return <Error message="Plugin not found" />
  }

  if (
    ((!plugin.data[pKey] && plugin.loading) ||
      (!plugin.data[pKey] && !plugin.loading && !plugin.error)) &&
    pp.type !== 'terminal'
  ) {
    return <Loader />
  }

  if (!plugin.data[pKey] && pp.type !== 'terminal') {
    return <Error message={plugin?.error?.response?.data?.message} />
  }

  const mountPlugin = () => {
    switch (pp.type) {
      case 'doc':
        return <Documentation plugin={pp} content={plugin.data[pKey]} />
      case 'pipeline':
        return <Pipelines plugin={pp} content={plugin.data[pKey]} />
      case 'argocd':
        return (
          <ArgoCD
            plugin={pp}
            deploy={deploy}
            content={plugin.data[pKey]}
            detailsCallHandler={detailsCallHandler}
            detailsContent={plugin.data[detailsKey]}
            detailsClearHandler={detailsClearHandler}
          />
        )
      case 'kubernetes':
        return (
          <Kubernetes plugin={pp} deploy={deploy} content={plugin.data[pKey]} />
        )
      case 'keptn':
        return (
          <Keptn
            plugin={pp}
            deploy={deploy}
            content={plugin.data[pKey]}
            detailsCallHandler={detailsCallHandler}
          />
        )
      case 'argoevents':
        return (
          <ArgoEvents
            plugin={pp}
            deploy={deploy}
            content={plugin.data[pKey]}
            detailsCallHandler={detailsCallHandler}
          />
        )
      case 'codequality':
        return (
          <Codequality
            plugin={pp}
            deploy={deploy}
            content={plugin.data[pKey]}
          />
        )
      case 'capi':
        return <Capi content={plugin.data[pKey]} deploy={deploy} />
      case 'terminal':
        return (
          <Terminal plugin={pp} deploy={deploy} content={plugin.data[pKey]} />
        )
      default:
        return <Error message={`Unsupported plugin type: ${pp.type}`} />
    }
  }

  return <ErrorBoundary>{mountPlugin()}</ErrorBoundary>
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {})(CatchAll)
