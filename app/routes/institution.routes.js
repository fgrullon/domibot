module.exports = app => {
  const institution = require("../controllers/institution.controller.js");

  var router = require("express").Router();

  // Get all institutions
  router.get("/institution", institution.findAll);

  // Get a institution by name
  router.get("/institution/:id", institution.findOne);

  // Get a institution by name
  router.post("/institution/:ministerio", institution.findMinisterio);

  // Get services
  router.get("/service/:service", institution.services);

  app.use("/api", router);
};
