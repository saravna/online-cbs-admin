module.exports = {
  apps : [{
    name: 'ADMIN',
    script: 'reactServer.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : '18.220.60.227',
      ref  : 'origin/master',
      repo : 'https://github.com/saravna/online-cbs-admin.git',
      path : '/var/www/admin',
      'post-deploy' : 'sudo npm install && sudo npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
