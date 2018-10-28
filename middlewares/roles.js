/**
 * El tipo de usuario que se ha evaluado de acuerdo a lo dado,
 * Los planeados por el momento son:
 * - Visitor
 * - Admin
 * - Owner
 * - Tenant
 * @param { { userType: { method: RegExp } } } routes
 * Objeto a evaluar si se va a otorgar acceso a la solicitud.
 * @returns {function(req Request, res Response, next NextFunction) : Response}
 */

const userRoleAuth = routes => (req, res, next) => {
  const {
    headers: { userType }, // userType se va a incluir más adelante en el Front.
    method,
    url,
  } = req;
  const role = !userType ? 0 : userType;

  const roleMethods = routes[role];

  if (!roleMethods) {
    return res.status(403).send({
      status: 403,
      name: 'Error',
      message: 'Invalid method request',
    });
  }

  const route = roleMethods[method];

  if (!route) {
    return res.status(403).send({
      statusCode: 403,
      name: 'Error',
      message: 'User do not have access',
    });
  }

  const canAccess = route.test(url);

  if (!canAccess) {
    return res.status(403).send({
      statusCode: 403,
      name: 'Error',
      message: 'User do not have access',
    });
  }

  return next();
};

module.exports = {
  userRoleAuth,
};
