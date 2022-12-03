const db = require("../models");
const {WebhookClient} = require('dialogflow-fulfillment');
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

exports.getInstitution = (req, res) => {
  const id = req.body.id;
    
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


exports.getService = (request, response) => {

  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent! ramon test`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
   function respPreg(agent) {
     let entidad = agent.parameters.entidad;
     let svc = agent.parameters.svcProusuario;
     let info = agent.parameters.informacion;
     
     agent.add(`MI RESP: Entidad: ${entidad} y servicio ${svc} e info ${info}`);     
  }


  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('PregCentral', respPreg);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
   
};