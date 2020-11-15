const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const mailConstructor = require('../mail/mail-constructor');

class Mail {
  static setupMail(adminMail, cb) { 
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
					user: adminMail, 
					clientId: process.env.G_CLIENT_ID,
					clientSecret: process.env.G_CLIENT_SECRET,
					refreshToken: process.env.G_REFRESH_TOKEN,
					accessToken: accessToken
				}
		  });
      cb(smtpTransport) 
    });
  }
  
  static sendMail(adminMail, params, cb) { 
  /* params = {
      type = 'request' | 'confirm' | 'refuse' | 'resetPasswordRequest' | 'add/publish/Article/Travel',
      requestedRole = 'visitor', etc,
			email = string,
			pwd_token = string
     }
  */ 
	let emailFrom = params.email;
	let emailTo = adminMail;
	if (params.type !== 'request') {
		emailTo = params.email;
		emailFrom = adminMail;
	}
	const getSmtpTransport = new Promise((resolve, reject) => {
		this.setupMail(adminMail, (resp) => {
			if (resp) {
				resolve(resp)
			} else {
				reject('There was a problem during the creation of the mail')
			}
		});
	})
	getSmtpTransport
		.then(smtpTransport => {
			const emailTemplate = mailConstructor.getMailTemplate(params)
			const mailOptions = mailConstructor.getMailOptions(emailFrom, emailTo, params.type, emailTemplate);
			smtpTransport.sendMail(mailOptions, (error, info) => {
				if (error) throw error
				smtpTransport.close();
				cb(info)
			});
		})
		.catch(err => {
			cb(err)
		})
  }
}

module.exports = Mail;
