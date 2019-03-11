validateRole = (token, roleToValidate) => {  
  
 return new Promise((res, rej) => {
   const decodeToken = Buffer.from(token.split('.')[1], 'base64').toString('binary');
   const role = JSON.parse(decodeToken).role
   if (role !== roleToValidate) {
     reject()
   } else {
     resolve()
   }
 });

module.exports = validateRole;
