module.exports = app => {
  const institution = require("../controllers/institution.controller.js");

  var router = require("express").Router();

  // Get all institutions
  router.get("/institution", institution.findAll);

  // Get a institution by name
  router.get("/institution/:id", institution.findOne);

  // Get services
  router.get("/service/:service", institution.services);

  // Get a institution by name
  router.post("/getAllInstitution", institution.findAll);

  // Get a institution by name
  router.post("/getInstitution", institution.getInstitution);

  // Get services
  router.post("/getService", institution.getService);


  app.use("/api", router);
};
