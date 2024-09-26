import React, { useState } from 'react'
import yaml from 'js-yaml'

import Card from '../../../../../UI/Card/Card'
import Follower from '../../../../../UI/Follower/Follower'
import YamlView from '../../../../../UI/YamlView/YamlView'
import Label from '../../../../../UI/Label/Label'

import { pluginHelper } from '../../../../../../helpers'

const ArgoEvents = ({ deploy, plugin, content, detailsCallHandler }) => {
  const [stage, setStage] = useState('')
  const [version, setVersion] = useState('')

 
  const buttonHandler = async () => {
    // Placeholder values for now
    const KRATEO_DEPLOYMENT_NAME = deploy.metadata.name; // Replace with actual value later
    const KRATEO_ENDPOINT_BEARER_TOKEN = process.env.KRATEO_ENDPOINT_BEARER_TOKEN; // Replace with actual token
    const KRATEO_ENDPOINT_TARGET_URL = process.env.KRATEO_ENDPOINT_TARGET_URL; // Replace with actual URL

    const repo_url = `https://github.insiel.it/insiel/${KRATEO_DEPLOYMENT_NAME}-cfg.git`;

    // Prepare the payload for the POST request
    const data = {
      repo_url,
      revision: 'main',
      env: stage,  // the selected stage (test, coll, prod)
      version: version,     // the entered version (image or number)
      verbose: 'true'
    };

    try {
      // Make the API call using fetch or axios
      const response = await fetch(KRATEO_ENDPOINT_TARGET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${KRATEO_ENDPOINT_BEARER_TOKEN}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Deploy triggered successfully:', result);
        alert('Deploy triggered successfully!');
      } else {
        console.error('Failed to trigger deploy:', response.statusText);
        alert('Failed to trigger deploy. Please try again.');
      }
    } catch (error) {
      console.error('Error triggering deploy:', error);
      alert('Error occurred while triggering deploy.');
    }

    // Clear inputs after the API call
    setStage('');
    setVersion('');
  };

  const stageChangeHandler = (e) => {
    setStage(e.target.value);
  };

  const versionChangeHandler = (e) => {
    setVersion(e.target.value);
  };

  return (
    <ul className="ul-double-view">
      <li className="li-menu">
        <Follower>
          <Card title={plugin.value}>
            <h2 className="mt">Trigger a new deploy</h2>
            <Label title="stage">
              <select value={stage} onChange={(e) => stageChangeHandler(e)}>
                <option value="">Select a stage</option>
                <option value="test">test</option>
                <option value="coll">coll</option>
                <option value="prod">prod</option>
              </select>
            </Label>
            <Label title="version">
              <input
                type="text"
                placeholder="registry/imageName:imageTag"
                onChange={(e) => setVersion(e.target.value)}
                disabled={stage === ''}
              />
            </Label>
            <button
              type="button"
              className="primary-button"
              onClick={buttonHandler}
              disabled={stage === ''}
            >
              trigger deploy
            </button>
          </Card>
        </Follower>
      </li>
    </ul>
  )
}

export default ArgoEvents
