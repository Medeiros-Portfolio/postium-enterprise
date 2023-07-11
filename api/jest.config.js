// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/api',
  reporters: [
    'default',
    [
      'jest-qase-reporter',
      {
        apiToken: process.env.QASE_API_TOKEN,
        projectCode: process.env.QASE_PROJECT_CODE,
        logging: true,
        runComplete: true,
      },
    ],
  ],
}

module.exports = config
