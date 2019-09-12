validateRole = (token, roleToValidate) => {
  if (!Array.isArray(roleToValidate)) {
    roleToValidate = [roleToValidate]
  }
  return new Promise((resolve, reject) => {
    const decodeToken = Buffer.from(token.split('.')[1], 'base64').toString('binary');
    const role = JSON.parse(decodeToken).role
    if (!roleToValidate.includes(role)) {
      reject({type: "AuthorizationError", error: `You need to have ${role} role to do this`})
    } else {
      resolve()
    }
  });
}

module.exports = validateRole;
