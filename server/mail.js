const BASE_PATH = 'http://localhost:3000';
const mail = {
  mail: 'sfaure.campus@gmail.com',
  password: '191013steinbeck',
  mailOptions: function (email) {
    return {
      from: email,
      to: 'sfaure.campus@gmail.com',
      subject: 'New request user for Travel blog',
      text: 'You have a request for a new user',
      html: ` <html>
                <head>
                  <style>
                    .main_content {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      height: 600px;
                    }

                    .buttons {
                      display: flex;
                      justify-content: center;
                      
                    }
                    .button {
                      width: 150px;
                      height: 50px;
                      background-color: lightblue;
                      color: lightgrey;
                      margin: 5px;
                    }
                  </style>
                </head>
              </html>
              <div class="main_content">
                <div>
                  <p>You have a request for a new user !</p>
                  <div>${email}</div>
                </div>
                <div class="buttons">
                  <button class="button"><a href="${BASE_PATH}/login/userrequest#${email}">Accept</a></button>
                  <button class="button">Refuse</button>
                </div>
             </div>
             `
    }  
  }
}

module.exports = mail;
