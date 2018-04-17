const Monaca = require('monaca-lib').Monaca;
const monaca = new Monaca({ clientType: 'api' });
const path = require('path');
const config = require('../monaca.config.json');

const projectId = monaca.getProjectId(path.resolve(__dirname, '../'));

const authPromise = monaca.login(config.user.id, config.user.pass).then(
  function() {
    console.log('Succesfully logged in!');
  },
  function(error) {
    console.log('Login failed: ' + JSON.stringify(error));
  },
);

authPromise
  .then(async () => {
    console.log('monaca.getProjectId', await projectId);
    return monaca.buildProject(await projectId, {
      platform: 'android',
      purpose: 'debug',
    });
  })
  .then(
    function() {
      console.log('sucess checkBuildAvailability !');
    },
    function(error) {
      console.log('checkBuildAvailability failed: ' + JSON.stringify(error));
    },
  );
