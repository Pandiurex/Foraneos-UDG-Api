const ADMIN = 0;
const OWNER = 1;
const TENANT = 2;
const VISITANT = 3;

const roleAccess = {
  [ADMIN]: {
    GET: [/(\/\w+)+\/?$/],
    POST: [/(\/\w+)+\/?$/],
    PUT: [/(\/\w+)+\/?$/],
    PATCH: [/(\/\w+)+\/?$/],
    DELETE: [/(\/\w+)+\/?$/],
  },
  [OWNER]: {
    GET: [/(\/locations)(\?.*)?$/,
      /(\/locations)(\/[0-9]+)$/,
      /(\/locations)(\/[0-9]+)(\/lives)$/,
      /(\/locations)(\/[0-9]+)(\/rates)$/,
      /(\/locations)(\/[0-9]+)(\/rates)(\/[0-9]+)$/,
      /(\/locations)(\/[0-9]+)(\/messages)$/,
      /(\/locations)(\/[0-9]+)(\/messages)(\/[0-9]+)$/,
      /(\/users)(\/[0-9]+)(\/livesIn)$/,
      /(\/complaintTypes)$/,
      /(\/locationImage\?.*)$/,
      /(\/locationService\?.*)$/,
      /(\/services)$/,
      /(\/users)(\/[0-9]+)$/,
      /(\/userProfileImage\?.*)$/,
      /(\/auth\/confirmEmail\?.*)$/],

    POST: [/(\/locations)$/,
      /(\/locations\/lives)$/,
      /(\/locations\/messages)$/,
      /(\/locations\/complaints)$/,
      /(\/email)$/,
      /(\/locationImage)$/,
      /(\/locationService)$/],

    PUT: [/(\/users)(\/[0-9]+)$/,
      /(\/locations)(\/[0-9]+)$/,
      /(\/locations\/lives)(\/[0-9]+)$/],

    PATCH: [/(\/users)(\/[0-9]+)$/,
      /(\/locations)(\/[0-9]+)$/,
      /(\/locations\/lives)(\/[0-9]+)$/],

    DELETE: [/(\/locations)(\/[0-9]+)$/,
      /(\/email)(\/[0-9]+)$/,
      /(\/locationImage)(\/[0-9]+)$/,
      /(\/locationService)$/,
      /(\/auth\/logout)$/],
  },
  [TENANT]: {
    GET: [/(\/locations)(\?.*)?$/,
      /(\/locations)(\/[0-9]+)$/,
      /(\/locations)(\/[0-9]+)(\/lives)$/,
      /(\/locations)(\/[0-9]+)(\/rates)$/,
      /(\/locations)(\/[0-9]+)(\/rates)(\/[0-9]+)$/,
      /(\/locations)(\/[0-9]+)(\/messages)$/,
      /(\/locations)(\/[0-9]+)(\/messages)(\/[0-9]+)$/,
      /(\/complaintTypes)$/,
      /(\/locationImage\?.*)$/,
      /(\/locationService\?.*)$/,
      /(\/users)(\/[0-9]+)$/,
      /(\/users)(\/[0-9]+)(\/livesIn)$/,
      /(\/userProfileImage\?.*)$/,
      /(\/auth\/confirmEmail\?.*)$/],

    POST: [/(\/locations\/rates)$/,
      /(\/locations\/messages)$/,
      /(\/locations\/complaints)$/,
      /(\/email)$/],

    PUT: [/(\/users)(\/[0-9]+)$/],

    PATCH: [/(\/users)(\/[0-9]+)$/,
      /(\/locations\/lives)(\/[0-9]+)$/],

    DELETE: [/(\/email)(\/[0-9]+)$/,
      /(\/auth\/logout)$/],
  },
  [VISITANT]: {
    GET: [/(\/locations)(\?.*)?$/,
      /(\/locations)(\/[0-9]+)$/,
      /(\/locations)(\/[0-9]+)(\/rates)$/,
      /(\/locations)(\/[0-9]+)(\/rates)(\/[0-9]+)$/,
      /(\/locationImage\?.*)$/,
      /(\/locationService)\?.*$/,
      /(\/users)(\/[0-9]+)$/,
      /(\/userProfileImage\?.*)$/,
      /(\/auth\/confirmEmail\?.*)$/,
      /(\/auth\/reqPasswordRecovery)(\?.*)?$/],
    POST: [/(\/users)$/,
      /(\/auth\/login)$/,
      /(\/auth\/passwordRecovery)$/],
  },
};

module.exports = roleAccess;
