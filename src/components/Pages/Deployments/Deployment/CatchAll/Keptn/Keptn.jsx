import React, { useState } from 'react'
import yaml from 'js-yaml'

import Card from '../../../../../UI/Card/Card'
import Follower from '../../../../../UI/Follower/Follower'
import YamlView from '../../../../../UI/YamlView/YamlView'
import Label from '../../../../../UI/Label/Label'

import StageCard from './StageCard/StageCard'
import { pluginHelper } from '../../../../../../helpers'

const Keptn = ({ deploy, plugin, content, detailsCallHandler }) => {
  const [stage, setStage] = useState('')
  const [sequence, setSequence] = useState('')

  const buttonHandler = () => {
    const regex = /\[(.*?)\]/gim
    const v = regex.exec(plugin.value)

    const data = {
      contenttype: 'application/json',
      type: `sh.keptn.event.${stage}.${sequence}.triggered`,
      source: 'bridge',
      data: {
        project: v[1],
        stage,
        service: plugin.value.replace(regex, '')
      }
    }
    if (sequence === 'evaluation') {
      data.data.evaluation = {
        timeframe: '5m'
      }
    }
    detailsCallHandler({
      url: pluginHelper.createCallUrl(plugin, deploy),
      method: 'post',
      data,
      message: 'Sequence triggered successfully'
    })

    console.log(pluginHelper.createCallUrl(plugin, deploy))

    setStage('')
    setSequence('')
  }

  const stageChangeHandler = (e) => {
    setStage(e.target.value)
    setSequence('')
  }

  const sequenceList = () => {
    if (stage === '') return []
    return yaml
      .load(content.shipyard)
      .spec.stages.find((x) => x.name === stage)
      .sequences.map((x) => x.name)
      .concat('evaluation')
  }

  return (
    <ul className="ul-double-view">
      <li className="li-menu">
        <Follower>
          <Card title={plugin.value}>
            {content.stages.map((s) => (
              <a
                href={`#${s.stageName}`}
                key={s.stageName}
                className="common-lnk"
              >
                {s.stageName}
              </a>
            ))}
            <hr />
            <a href="#shipyard" className="common-lnk">
              shipyard
            </a>
            <h2 className="mt">Trigger a new sequence</h2>
            <Label title="stage">
              <select value={stage} onChange={(e) => stageChangeHandler(e)}>
                <option value=""></option>
                {content.stages.map((s) => (
                  <option key={s.stageName} value={s.stageName}>
                    {s.stageName}
                  </option>
                ))}
              </select>
            </Label>
            <Label title="sequence">
              <select
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                disabled={stage === ''}
              >
                <option value=""></option>
                {sequenceList().map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Label>
            <button
              type="button"
              className="primary-button"
              onClick={buttonHandler}
              disabled={stage === '' || sequence === ''}
            >
              trigger sequence
            </button>
          </Card>
        </Follower>
      </li>
      <li className="li-content">
        {content.stages.map((s) => (
          <StageCard key={s.stageName} s={s} />
        ))}
        <Card title="Shipyard" anchor="shipyard">
          <YamlView
            data={content.shipyard}
            fileName={`${deploy.metadata.uid}-shipyard`}
          />
        </Card>
      </li>
    </ul>
  )
}

export default Keptn
