const { dependencies } = require('./package.json')

module.exports = {
  name: 'base',
  filename: 'remoteEntry.js',
  exposes: {
    // './App': './src/App',
    './Bootstrap': './src/bootstrap.tsx',
  },
  remotes: {
    remote: 'remote@https://ionic-components.vercel.app/remoteEntry.js',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
      eager: true,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
      eager: true,
    },
  },
}