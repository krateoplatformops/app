import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'

import { logFetch, logDeleteKey } from '../../../../../redux/actions'
import Log from './Log/Log'
import LocalSearch from '../../../../UI/LocalSearch/LocalSearch'

const Events = ({ deploy, log }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (deploy.metadata.uid) {
      dispatch(
        logFetch({
          key: deploy.metadata.uid
        })
      )
    }
    return () => {
      logDeleteKey({ key: deploy.metadata.uid })
    }
  }, [deploy.metadata.uid, dispatch])

  return (
    <React.Fragment>
      <LocalSearch>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </LocalSearch>

      {(log.data[deploy.metadata.uid]?.list || [])
        .filter((x) => {
          return (
            x.message.toLowerCase().indexOf(search) > -1 ||
            x.source.toLowerCase().indexOf(search) > -1 ||
            x.reason.toLowerCase().indexOf(search) > -1
          )
        })
        .sort((a, b) => b.time - a.time)
        .map((log, key) => (
          <Log key={key} log={log} />
        ))}
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {})(Events)
