const HydraExpress = require('hydra-express');
const Hydra = require('hydra');
// Configuración de Hydra para el microservicio 

const hydraConfig = {
  hydra: {
    // nombre del micro-servicio. Es importante para identificar el servicio en la red de microservicio
    serviceName: 'products-service',
    serviceIP: '',
    servicePort: parseInt(process.env.PORT || '3000', 10),
    serviceType: 'express',
    serviceDescription: 'Product service',
    // Configuración de Redis, usada por hydra para el manejo de mensajes y servicios
    redis: {
      url: process.env.REDIS_URL,
      db: 15
    }

  }
};

// Inicializar Hydra
function initHydra() {
  return HydraExpress.init(hydraConfig, () => {
    HydraExpress.registerRoutes({
      '/v1/products': require('../controllers/ProductController')
    });
  });
}

module.exports = {
  initHydra,
  hydra: Hydra
}