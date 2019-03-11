validateRole = (token, roleToValidate) => {  
  if (!Array.isArray(roleToValidate)) {
    roleToValidate = [roleToValidate]
  }
  return new Promise((res, rej) => {
    const decodeToken = Buffer.from(token.split('.')[1], 'base64').toString('binary');
    const role = JSON.parse(decodeToken).role
    if (roleToValidate.indexOf(role) == -1) {
      reject()
    } else {
      resolve()
    }
  });
}

module.exports = validateRole;
