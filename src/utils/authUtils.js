const { hydra } = require('../config/hydraConfig');

async function validateToken(token) {
  let message = hydra.createUMFMessage({
    to: 'auth-service:[POST]/auth/validatetoken',
    from: 'products-service',
    body: { token }
  });

  try {
    let response = hydra.makeAPIRequest(message);
    console.log(response);
    if(response.statusCode === 200) {
      return response.result;
    } else {
      throw new Error(response.statusMessage || 'Error processing validation request');
    }
  } catch (error) {
    console.error('Error in communicating with auth service', err);
    throw new Error('Authentication service unavailable');
  }

}

module.exports = { validateToken };

// http://localhost:4000/auth/validatetoken

// ESTO DEBERIA DEVOLVER EN EL "response"
// {
//   "result": {
//     "userId": "65c50da10f8cad888b34b8be",
//     "role": "ADMIN",
//     "iat": 1707414032,
//     "exp": 1707417632
//   }
// }