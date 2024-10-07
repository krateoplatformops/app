import React, { useState } from 'react'
import Card from '../../../../../UI/Card/Card'
import Follower from '../../../../../UI/Follower/Follower'
import Label from '../../../../../UI/Label/Label'
import { pluginHelper } from '../../../../../../helpers'

const ArgoEvents = ({ deploy, plugin, content, detailsCallHandler }) => {

  console.log('ArgoEvents component mounted');
  console.log('Initial props:', { 
    deployName: deploy?.metadata?.name,
    pluginName: plugin?.name,
    hasDetailsHandler: !!detailsCallHandler 
  });

  console.log('All environment variables:', process.env);
  console.log('Window env variables:', window.env);

  console.log('Props:', { deploy, plugin, content, detailsCallHandler });

  const [stage, setStage] = useState('')
  const [version, setVersion] = useState('')

  const stages = ['test', 'coll', 'prod']

  const KRATEO_DEPLOYMENT_NAME = deploy.metadata.name;
  const KRATEO_ENDPOINT_BEARER_TOKEN = process.env.REACT_APP_KRATEO_ENDPOINT_BEARER_TOKEN;
  const KRATEO_ENDPOINT_TARGET_URL = process.env.REACT_APP_KRATEO_ENDPOINT_TARGET_URL;

  console.log('Deployment Name:', KRATEO_DEPLOYMENT_NAME);
  console.log('Bearer Token:', KRATEO_ENDPOINT_BEARER_TOKEN);
  console.log('Target URL:', KRATEO_ENDPOINT_TARGET_URL);

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

    fetch(KRATEO_ENDPOINT_TARGET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log('API call successful:', result);
      alert('Argo Events sequence triggered successfully');
      
      // Reset form
      setStage('')
      setVersion('')
    })
    .catch(error => {
      console.error('Error making API call:', error);
      alert('Error triggering Argo Events sequence. Check console for details.');
    });

    // detailsCallHandler({
    //   // url: pluginHelper.createCallUrl(plugin, deploy),
    //   url: data.repo_url,
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${KRATEO_ENDPOINT_BEARER_TOKEN}`
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