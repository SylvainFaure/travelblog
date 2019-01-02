const mail = {
  mail: username@mail.com,
  password: topSecretPassword,
  mailOptions: function (email){
    return {
      from: 'username@mail.com',
      to: email,
      subject: 'New request user for Travel blog',
      text: 'You have a request for a new user',
      html: '<div>You have a request for a new user</div>'
    }  
  }
}

module.exports = mail;
