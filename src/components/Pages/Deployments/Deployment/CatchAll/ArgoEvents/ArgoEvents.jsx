import React, { useState } from 'react'
import Card from '../../../../../UI/Card/Card'
import Follower from '../../../../../UI/Follower/Follower'
import Label from '../../../../../UI/Label/Label'
import { pluginHelper } from '../../../../../../helpers'

//const ArgoEvents = ({ deploy, plugin, detailsCallHandler }) => {
const ArgoEvents = ({ deploy, plugin }) => {

  console.log('ArgoEvents component mounted');
  console.log('Props:', { deploy, plugin });

  const [stage, setStage] = useState('')
  const [version, setVersion] = useState('')

  const stages = ['test', 'coll', 'prod']

  const buttonHandler = () => {
    const deploymentName = deploy.metadata.name

    const data = {
      repo_url: `https://github.insiel.it/insiel/${deploymentName}-cfg.git`,
      revision: 'main',
      env: stage,
      version: version,
      verbose: 'true'
    }

    // detailsCallHandler({
    //   url: pluginHelper.createCallUrl(plugin, deploy),
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data,
    //   message: 'Argo Events sequence triggered successfully'
    // })

    // Reset form
    setStage('')
    setVersion('')
  }

  return (
    <ul className="ul-double-view">
      <li className="li-menu">
        <Follower>
          <Card title="Argo Events">
            <Label title="Stage">
              <select 
                value={stage} 
                onChange={(e) => setStage(e.target.value)}
              >
                <option value="">Select stage</option>
                {stages.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Label>
            <Label title="Version">
              <input
                type="text"
                placeholder="Docker image or version number"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </Label>
            <button
              type="button"
              className="primary-button"
              onClick={buttonHandler}
              disabled={!stage || !version}
            >
              Trigger Deploy
            </button>
          </Card>
        </Follower>
      </li>
      <li className="li-content">
        {/* Qui puoi aggiungere eventuali contenuti aggiuntivi se necessario */}
      </li>
    </ul>
  )
}

export default ArgoEvents