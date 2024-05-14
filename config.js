const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('api.yaml');


const option = {
    customSiteTitle:"Voosh API Docs"
}

module.exports = {
    swaggerServer: swaggerUI.serve,
    swaggerSetup: swaggerUI.setup(swaggerJSDocs, option)
}