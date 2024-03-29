import React from 'react'
import { Link } from 'react-router-dom'

import css from './DeploymentCard.module.scss'
import { timeHelper } from '../../../../../helpers'

import Tag from '../../../../UI/Tag/Tag'

const DeploymentCard = ({ d }) => (
  <Link to={`/deployments/${d.metadata.uid}`} className={css.Link}>
    <ul className={css.UlDeployment}>
      <li className={css.LiIcon}>
        <i className={d.spec.icon}></i>
      </li>
      <li className={css.LiInfo}>
        <b>{d.metadata.name}</b>
        <span>{d.spec.description}</span>
      </li>
      <li className={css.LiDate}>
        {timeHelper.dateGenToFormat(d.metadata.creationTimestamp)}
      </li>
    </ul>
    <ul className={css.UlStatus}>
      <li className={css.LiTags}>
        {(d.spec.tags || []).map((t) => (
          <Tag key={t} tag={t} />
        ))}
      </li>
      {/* <li className={css.LiStats}>
        <span
          className={css.SpanSecurityIssues}
          {...(d.securityIssues > 0 && { active: 'true' })}
        >
          {d.securityIssues} <i className="fa-solid fa-shield"></i>
        </span>
        <span
          className={css.SpanCodeIssues}
          {...(d.codeIssues > 0 && { active: 'true' })}
        >
          {d.codeIssues} <i className="fa-solid fa-triangle-exclamation"></i>
        </span>
        <span
          className={css.SpanCodeRequests}
          {...(d.codeRequests > 0 && { active: 'true' })}
        >
          {d.codeRequests} <i className="fa-solid fa-code-pull-request"></i>
        </span> */}
      {/* <span
            className={css.SpanBudget}
            {...(d.budget > 0 && { active: 'true' })}
          >
            {d.budget} <i className='fa-solid fa-sack-dollar'></i>
          </span> */}
      {/* </li> */}
    </ul>
  </Link>
)

export default DeploymentCard
