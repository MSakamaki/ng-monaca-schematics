const Monaca = require("monaca-lib").Monaca;
const monaca = new Monaca({ clientType: "api" });
const path = require("path");
const config = require("../monaca.config.json");

const projectId = monaca.getProjectId(path.resolve(__dirname, "../"));

const authPromise = monaca.login(config.user.id, config.user.pass).then(
  function() {
    console.log("Succesfully logged in!");
  },
  function(error) {
    console.log("Login failed: " + JSON.stringify(error));
  }
);

authPromise
  .then(async () => {
    return monaca.createProject({
      name: "<%= name %>",
      description: "An awesome app that does awesome things.",
      template: "minimum"
    });
  })
  .then(
    function(result) {
      monaca.setProjectId(path.resolve(__dirname, "../"), result.projectId);
      console.log("sucess checkBuildAvailability !");
    },
    function(error) {
      console.log("checkBuildAvailability failed: " + JSON.stringify(error));
    }
  );
