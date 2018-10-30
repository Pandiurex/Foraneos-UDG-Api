const { userTypes } = require('./userTypes');

const {
  ADMIN, OWNER, TENANT, VISITANT,
} = userTypes;

// Pasamos como clave el valor de la variable.
exports.roleAccess = {
  [ADMIN]: {
    GET: [/(\/\w+)+\/?/],
    POST: [/(\/\w+)+\/?/],
    PUT: [/(\/\w+)+\/?/],
    PATCH: [/(\/\w+)+\/?}/],
    DELETE: [/(\/\w+)+\/?/],
  },
  [OWNER]: { // Dueño.
    GET: [/(\/users)(\/\w+)(\/livesIn)/, /(\/locations)/, /(\/locations)(\/\w+)/,
      /(\/locations)(\/\w+)(\/lives)/, /(\/locations)(\/\w+)(\/rates)/,
      /(\/locations)(\/\w+)(\/rates)(\/\w+)/, /(\/locations)(\/\w+)(\/messages)/,
      /(\/locations)(\/\w+)(\/messages)(\/\w+)/, /(\/auth)(\/reqPasswordRecovery)?\/?/],

    POST: [/(\/locations)/, /(\/locations)(\/\w+)(\/lives)/, /(\/locations)(\/\w+)(\/messages)/,
      /(\/locations)(\/\w+)(\/complaints)/, /(\/locations)(\/\w+)(\/locationService)/,
      /(\/email)/, /(\/locationImage)/, /(\/auth)(\/confirmEmail)?\/?/,
      /(\/auth)(\/passwordRecovery)?\/?/],

    PUT: [/(\/users)(\/\w+)/, /(\/locations)(\/\w+)/,
      /(\/locations)(\/\w+)(\/lives)(\/\w+)/],

    PATCH: [/(\/users)(\/\w+)/, /(\/locations)(\/\w+)/,
      /(\/locations)(\/\w+)(\/lives)(\/\w+)/],

    DELETE: [/(\/locations)(\/\w+)/, /(\/locations)(\/\w+)(\/locationService)(\/\w+)/,
      /(\/email)(\/\w+)/, /(\/locationImage)(\/\w+)/, /(\/auth)(\/logout)?\/?/],
  },
  [TENANT]: { // Inquilino.
    GET: [/(\/locations)/, /(\/locations)(\/\w+)/, /(\/locations)(\/\w+)(\/lives)/,
      /(\/locations)(\/\w+)(\/rates)/, /(\/locations)(\/\w+)(\/rates)(\/\w+)/,
      /(\/locations)(\/\w+)(\/messages)/, /(\/locations)(\/\w+)(\/messages)(\/\w+)/,
      /(\/auth)(\/reqPasswordRecovery)?\/?/],

    POST: [/(\/locations)(\/\w+)(\/lives)/, /(\/locations)(\/\w+)(\/rates)/,
      /(\/locations)(\/\w+)(\/messages)/, /(\/locations)(\/\w+)(\/complaints)/,
      /(\/email)/, /(\/auth)(\/confirmEmail)?\/?/, /(\/auth)(\/passwordRecovery)?\/?/],

    PUT: [/(\/users)(\/\w+)/, /(\/locations)(\/\w+)(\/lives)(\/\w+)/],

    PATCH: [/(\/users)(\/\w+)/, /(\/locations)(\/\w+)(\/lives)(\/\w+)/],

    DELETE: [/(\/email)(\/\w+)/, /(\/auth)(\/logout)?\/?/],
  },
  [VISITANT]: {
    // Aquí van las rutas de auth para un visitante.
    GET: [/(\/locations)(\/\w+)(\/rates)/, /(\/locations)(\/\w+)(\/rates)(\/\w+)/,
      /(\/auth)(\/reqPasswordRecovery)?\/?/],
    POST: [/(\/users)/, /(\/auth)(\/login)?\/?/, /(\/auth)(\/passwordRecovery)?\/?/],
  },
};
