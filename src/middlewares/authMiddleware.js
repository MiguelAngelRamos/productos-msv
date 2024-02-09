const { validateToken } = require('../utils/authUtils');

async function authMiddlware(req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const userData = await validateToken(token);
    console.log(userData);

    if(userData.role !== 'ADMIN') return res.status(403).send('Acceso denegado');

    req.user = userData;
    next();
  } catch (error) {
    res.status(401). send('No autorizado');
  }
}

module.exports = authMiddlware;
// Esto deberia ser el userData
//   {
//     "userId": "65c50da10f8cad888b34b8be",
//     "role": "ADMIN",
//     "iat": 1707414032,
//     "exp": 1707417632
//   }
