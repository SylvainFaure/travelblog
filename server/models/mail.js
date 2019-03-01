const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const mailConstructor = require(../mail/mail);

class Mail {
  static setupMail(admin) {
    const oauth2Client = new OAuth2(
				process.env.G_CLIENT_ID,
				process.env.G_CLIENT_SECRET, 
				process.env.G_REDIRECT_URL
		);
			
		oauth2Client.setCredentials({
			refresh_token: process.env.G_REFRESH_TOKEN
		});
		oauth2Client.getAccessToken((err, accessToken) => {
			if (err) throw err;
			const smtpTransport = nodemailer.createTransport({
				service: "gmail",
				auth: {
					type: "OAuth2",
					user: admin.user_email, 
					clientId: process.env.G_CLIENT_ID,
					clientSecret: process.env.G_CLIENT_SECRET,
					refreshToken: process.env.G_REFRESH_TOKEN,
					accessToken: accessToken
				}
		  });
      return smtpTransport
    });
  }
  
  static sendMail(superAdmin, emailTo, params) { 
  /* params = {
      type = 'sendRequest' | 'confirmRequest' | 'refuseRequest' | 'add/publish/Article/Travel',
      requestedRole = 'visitor', etc
     }
  */ 
    const getSmtpTransport = new Promise((resolve, reject) => {
      resolve(this.setupMail(superAdmin))
    })
    getSmtpTransport()
      .then(smtpTransport => {
        const emailTemplate = mailConstructor.getMailTemplate(params)
        const mailOptions = mailConstructor.mailOptions(email, role, admin.user_email, emailTemplate);
				smtpTransport.sendMail(mailOptions, (error, info) => {
					if (error) throw error
					smtpTransport.close();
					cb(info)
				});
			})
     })
		  
  }
}

module.exports = Mail;
