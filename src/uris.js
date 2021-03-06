const uris = {
  apiBase:
    window.runConfig.apiBaseUrl +
    (window.runConfig.apiBaseUrl[window.runConfig.apiBaseUrl.length - 1] === '/'
      ? ''
      : '/'),
  auth: 'http://localhost:8093/auth',
  config: 'config',
  user: 'user',
  logout: 'auth/logout',
  register: 'register',
  template: 'template',
  deployment: 'deployment',
  socket:
    window.runConfig.socketUrl +
    (window.runConfig.socketUrl[window.runConfig.socketUrl.length - 1] === '/'
      ? ''
      : '/'),
  proxy: 'proxy',
  endpoint: 'endpoint',
  log: 'log',
  dashboard: 'dashboard',
  package: 'package',
  component: 'component',
  secret: 'secret',
  catalog:
    'https://raw.githubusercontent.com/krateoplatformops/catalog/main/index.json',
  strategy: 'http://localhost:8093/strategy'
}

export default uris
