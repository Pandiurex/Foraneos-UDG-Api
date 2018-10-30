/**
 * El tipo de usuario que se ha evaluado de acuerdo a lo dado,
 * Los planeados por el momento son:
 * -VISITANT
 * -ADMIN
 * -OWNER
 * -TENANT
 * @param { { userType: { method: RegExp } } } routes
 * Objeto a evaluar si se va a otorgar acceso a la solicitud.
 * @returns {function(req Request, res Response, next NextFunction) : Response}
 */

exports.userRoleAuth = routes => (req, res, next) => {
  const {
    headers: { userType }, // userType se va a incluir más adelante en el Front.
    method,
    url,
  } = req;
  const role = !userType ? 3 : userType;

  const roleMethods = routes[role];

  if (!roleMethods) {
    return res.status(403).send({
      status: 403,
      name: 'Error',
      message: 'Invalid method request',
    });
  }

  const routeArray = roleMethods[method];

  if (!routeArray) {
    return res.status(403).send({
      status: 403,
      name: 'Error',
      message: 'User do not have access',
    });
  }

  const canAccess = routeArray.some(route => route.test(url));

  if (!canAccess) {
    return res.status(403).send({
      status: 403,
      name: 'Error',
      message: 'User do not have access',
    });
  }

  return next();
};
