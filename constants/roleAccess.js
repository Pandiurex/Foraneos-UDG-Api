const { userTypes } = require('./userTypes');

const {
  ADMIN, OWNER, TENANT, VISITANT,
} = userTypes;

// Pasamos como clave el valor de la variable.
exports.roleAccess = {
  [ADMIN]: {
    GET: /(\/\w+)+\/?/,
    POST: /(\/\w+)+\/?/,
    PUT: /(\/\w+)+\/?/,
    PATCH: /(\/\w+)+\/?/,
    DELETE: /(\/\w+)+\/?/,
  },
  [OWNER]: {
    GET: /(\/\w+)+\/?/,
    POST: /(\/\w+)+\/?/,
    PUT: /(\/\w+)+\/?/,
    PATCH: /(\/\w+)+\/?/,
    DELETE: /(\/\w+)+\/?/,
  },
  [TENANT]: {
    GET: /(\/\w+)+\/?/,
    POST: /(\/\w+)+\/?/,
    PUT: /(\/\w+)+\/?/,
    PATCH: /(\/\w+)+\/?/,
    DELETE: /(\/\w+)+\/?/,
  },
  [VISITANT]: {
    // Aquí van las rutas de auth para un visitante.
    POST: /(\/auth)(\/login)?\/?/,
  },
};
