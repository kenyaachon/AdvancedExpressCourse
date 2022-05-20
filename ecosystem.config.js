module.exports = {
  apps: [
    {
      name: "meetup",
      script: "bin/www",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    production: {
      key: "/Users/mosesmbugua/.ssh/LINKEDIN2.pem",
      user: "ubuntu",
      host: "ec2-54-185-250-77.us-west-2.compute.amazonaws.com",
      ref: "origin/main",
      repo: "https://github.com/kenyaachon/AdvancedExpressCourse",
      path: "/home/ubuntu/deploy",
      "post-deploy":
        "cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js -env production",
    },
  },
};
