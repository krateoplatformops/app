export const endpointUIConstants = {
  types: [
    {
      type: 'github',
      category: 'git',
      fields: [
        {
          title: 'Github token',
          name: 'token',
          type: 'password',
          description: 'Github token',
          required: true
        }
      ]
    },
    {
      type: 'bitbucket',
      category: 'git',
      fields: [
        {
          title: 'Bitbucket bearer token (pat)',
          name: 'bearer',
          type: 'password',
          description: 'Bitbucket bearer token (pat)',
          required: true
        },
        {
          title: 'Username',
          name: 'username',
          type: 'text',
          description: 'Bitbucket username',
          required: true
        },
        {
          title: 'Password',
          name: 'password',
          type: 'password',
          description: 'Bitbucket password',
          required: true
        }
      ]
    },
    {
      type: 'argocd',
      category: 'delivery',
      fields: [
        {
          title: 'ArgoCD bearer token',
          name: 'bearer',
          type: 'password',
          description: 'ArgoCD bearer token',
          required: true
        }
      ]
    },
    {
      type: 'keptn',
      category: 'delivery',
      fields: [
        {
          title: 'Keptn token',
          name: 'token',
          type: 'password',
          description: 'Keptn Api token',
          required: true
        }
      ]
    },
    {
      type: 'argoevents',
      category: 'delivery',
      fields: [
        {
          title: 'ArgoEvents token',
          name: 'token',
          type: 'password',
          description: 'ArgoEvents Bearer token',
          required: true
        }
      ]
    },
    {
      type: 'sonarcloud',
      category: 'delivery',
      fields: [
        {
          title: 'SonarCloud token',
          name: 'token',
          type: 'password',
          description: 'SonarCloud Api token',
          required: true
        }
      ]
    },
    {
      type: 'jenkins',
      category: 'delivery',
      fields: [
        {
          title: 'Jenkins token',
          name: 'token',
          type: 'password',
          description: 'Jenkins token',
          required: true
        },
        {
          title: 'Username',
          name: 'username',
          type: 'text',
          description: 'Jenkins username',
          required: true
        }
      ]
    },
    {
      type: 'typeform',
      category: 'delivery',
      fields: [
        {
          title: 'Typeform token',
          name: 'token',
          type: 'password',
          description: 'Typeform token',
          required: true
        }
      ]
    },
    {
      type: 'azuredevops',
      category: 'git',
      fields: [
        {
          title: 'Azure DevOps token',
          name: 'token',
          type: 'password',
          description: 'Azure DevOps token',
          required: true
        }
      ]
    },
    {
      type: 'gitlab',
      category: 'git',
      fields: [
        {
          title: 'GitLab token',
          name: 'token',
          type: 'password',
          description: 'GitLab token',
          required: true
        }
      ]
    }
  ]
}
