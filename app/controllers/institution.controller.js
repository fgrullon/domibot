const db = require("../models");
const Institution = db.institution;

getService = (data, term) => {

  let services  = [];
  
  data.map((m) => {
    for(serv in m.servicios){
      let str = m.servicios[serv].servicio
      if(str.toLowerCase().includes(term.toLowerCase())){
        services.push(m.servicios[serv])
      }
    }
  });
  return services;
}

// Retrieve all institutions from the database.
exports.findAll = (req, res) => {
 
  Institution.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving institution."
      });
    });
};

// Find a single institution with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Institution.find({ _id : { $eq: id }  })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Institution with id " + id });
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Institution with id=" + id });
    });
};

// Find ministerio by name

exports.findMinisterio = (req, res) => {
  const ministerio = req.params.ministerio;
  
  Institution.find({ ministerio : { $regex: ".*"+ministerio+".*", $options : 'i'}   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving service."
      });
    });
}


// Find all services
exports.services = (req, res) => {

  const service = req.params.service;
  
  Institution.find({ servicios: { $elemMatch: { servicio: { $regex: ".*"+service+".*", $options : 'i'}  } } })
    .then(data => {
      console.log(getService(data, service))
      res.send(getService(data, service));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving service."
      });
    });
};
