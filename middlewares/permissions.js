const ADMIN = 0;
const OWNER = 1;
const TENANT = 2;
const VISITANT = 3;

const roleAccess = {
  [ADMIN]: {
    GET: [/(\/\w+)+\/?/],
    POST: [/(\/\w+)+\/?/],
    PUT: [/(\/\w+)+\/?/],
    PATCH: [/(\/\w+)+\/?}/],
    DELETE: [/(\/\w+)+\/?/],
  },
  [OWNER]: {
    GET: [/(\/users)(\/\w+)(\/livesIn)/,
      /(\/locations)\?.*/,
      /(\/locations)(\/\w+)\?/,
      /(\/locations)(\/\w+)(\/lives)/,
      /(\/locations)(\/\w+)(\/rates)/,
      /(\/locations)(\/\w+)(\/rates)(\/\w+)/,
      /(\/locations)(\/\w+)(\/messages)/,
      /(\/locations)(\/\w+)(\/messages)(\/\w+)/,
      /(\/auth)(\/reqPasswordRecovery)?\/?/],

    POST: [/(\/locations)/,
      /(\/locations)(\/\w+)(\/lives)/,
      /(\/locations)(\/\w+)(\/messages)/,
      /(\/locations)(\/\w+)(\/complaints)/,
      /(\/locations)(\/\w+)(\/locationService)/,
      /(\/email)/,
      /(\/locationImage)/,
      /(\/auth)(\/confirmEmail)?\/?/,
      /(\/auth)(\/passwordRecovery)?\/?/],

    PUT: [/(\/users)(\/\w+)/,
      /(\/locations)(\/\w+)/,
      /(\/locations)(\/\w+)(\/lives)(\/\w+)/],

    PATCH: [/(\/users)(\/\w+)/,
      /(\/locations)(\/\w+)/,
      /(\/locations)(\/\w+)(\/lives)(\/\w+)/],

    DELETE: [/(\/locations)(\/\w+)/,
      /(\/locations)(\/\w+)(\/locationService)(\/\w+)/,
      /(\/email)(\/\w+)/,
      /(\/locationImage)(\/\w+)/,
      /(\/auth)(\/logout)?\/?/],
  },
  [TENANT]: {
    GET: [/(\/locations)\?.*/,
      /(\/locations)(\/\w+)\?/,
      /(\/locations)(\/\w+)(\/lives)/,
      /(\/locations)(\/\w+)(\/rates)/,
      /(\/locations)(\/\w+)(\/rates)(\/\w+)/,
      /(\/locations)(\/\w+)(\/messages)/,
      /(\/locations)(\/\w+)(\/messages)(\/\w+)/,
      /(\/auth)(\/reqPasswordRecovery)?\/?/],

    POST: [/(\/locations)(\/\w+)(\/lives)/,
      /(\/locations)(\/\w+)(\/rates)/,
      /(\/locations)(\/\w+)(\/messages)/,
      /(\/locations)(\/\w+)(\/complaints)/,
      /(\/email)/,
      /(\/auth)(\/confirmEmail)?\/?/,
      /(\/auth)(\/passwordRecovery)?\/?/],

    PUT: [/(\/users)(\/\w+)/,
      /(\/locations)(\/\w+)(\/lives)(\/\w+)/],

    PATCH: [/(\/users)(\/\w+)/,
      /(\/locations)(\/\w+)(\/lives)(\/\w+)/],

    DELETE: [/(\/email)(\/\w+)/,
      /(\/auth)(\/logout)?\/?/],
  },
  [VISITANT]: {
    GET: [/(\/locations)\?.*/,
      /(\/locations)(\/\w+)(\/rates)/,
      /(\/locations)(\/\w+)(\/rates)(\/\w+)/,
      /(\/auth)(\/reqPasswordRecovery)?\/?/],
    POST: [/(\/users)/,
      /(\/auth)(\/login).*/,
      /(\/auth)(\/passwordRecovery)?\/?/],
  },
};

module.exports = roleAccess;
