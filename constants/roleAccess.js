const { userType } = require('./userTypes');

const {
  ADMIN, OWNER, TENANT, VISITANT,
} = userType;

// Pasamos como clave el valor de la variable.
exports.rolesAccess = {
  [ADMIN]: {
    GET: /(\/\w+)+\/?/g,
    POST: /(\/\w+)+\/?/g,
    PUT: /(\/\w+)+\/?/g,
    PATCH: /(\/\w+)+\/?/g,
    DELETE: /(\/\w+)+\/?/g,
  },
  [OWNER]: {
    GET: /(\/\w+)+\/?/g,
    POST: /(\/\w+)+\/?/g,
    PUT: /(\/\w+)+\/?/g,
    PATCH: /(\/\w+)+\/?/g,
    DELETE: /(\/\w+)+\/?/g,
  },
  [TENANT]: {
    GET: /(\/\w+)+\/?/g,
    POST: /(\/\w+)+\/?/g,
    PUT: /(\/\w+)+\/?/g,
    PATCH: /(\/\w+)+\/?/g,
    DELETE: /(\/\w+)+\/?/g,
  },
  [VISITANT]: {
    // Aquí van las rutas de auth para un visitante.
    POST: /(\/auth)(\/login)?\/?/g,
  },
};
