import React, { useState } from 'react'
import Card from '../../../../../UI/Card/Card'
import Follower from '../../../../../UI/Follower/Follower'
import Label from '../../../../../UI/Label/Label'
import { pluginHelper } from '../../../../../../helpers'

const ArgoEvents = ({ deploy, plugin, detailsCallHandler }) => {

  console.log('ArgoEvents component mounted');
  console.log('Initial props:', { 
    deployName: deploy?.metadata?.name,
    pluginName: plugin?.name,
    hasDetailsHandler: !!detailsCallHandler 
  });

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

    console.log('Prepared request data:', data);

    // const callUrl = pluginHelper.createCallUrl(plugin, deploy);
    // console.log('Created call URL:', callUrl);

    const response = await fetch(data.repo_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API call successful:', result);
    alert('Argo Events sequence triggered successfully');

    // detailsCallHandler({
    //   // url: pluginHelper.createCallUrl(plugin, deploy),
    //   url: data.repo_url,
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