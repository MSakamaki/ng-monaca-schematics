const Monaca = require("monaca-lib").Monaca;
const monaca = new Monaca({ clientType: "api" });
const path = require("path");
const config = require("../monaca.config.json");

const authPromise = monaca.login(config.user.id, config.user.pass).then(
  function() {
    console.log("Succesfully logged in!");
  },
  function(error) {
    console.log("Login failed: " + JSON.stringify(error));
  }
);

authPromise
  .then(() => {
    console.log(path.resolve(__dirname, "../"));
    return monaca.uploadProject(path.resolve(__dirname, "../"));
  })
  .then(
    function() {
      console.log("Succesfully uploadProject !");
    },
    function(error) {
      console.log("uploadProject failed: " + JSON.stringify(error));
    }
  );
