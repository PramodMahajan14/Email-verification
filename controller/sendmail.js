const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"; //https://mail.google.com

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

//send mail
const imgsrc =
  "https://zapier-images.imgix.net/storage/services/6cf3f5a461feadfba7abc93c4c395b33_2.png?auto=format&fit=crop&ixlib=react-9.5.1-beta.1&q=50&w=30&h=30&dpr=1";
const sendEmail = async (to, url, txt) => {
  try {
    oauth2Client.setCredentials({
      refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      form: "apiassignment@snellcart.com",
      to: to,
      subject: "Verification Mail",
      html: `
      <head>
      <title>
      <h2><img src=${imgsrc}> Slack</h2>
      <h3>Comfirm your email address to started on slack</h3>
      </title>
   
      <style>
        .logo {
            position: absolute;
            width: 69px;
            height: 60px;
            left: 85px;
            top: 66px;
        }
        .logo-name {
            position: absolute;
            width: 147px;
            height: 23px;
            padding-top: 20px;
            left: 85px;
            top: 160px;
        }
        .desc {
          position: absolute;
          width: 711px;
          height: 143px;
          left: 97px;
          top: 240px;
 
          
          font-style: normal;
          font-weight: 400;
          font-size: 22px;
          line-height: 28px;
 
          color: #606060;
        }
        .btn {
          position: absolute;
          width: 153px;
          height: 37px;
          left: 97px;
          top: 427px;
 
          background: #B7D7F7;
          border-radius: 4px;
          border: none;
        }
        .btn-text {
          width: 153px;
          height: 16px;
          left: 97px;
          top: 437px;
 
          font-family: 'Sora';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          text-transform: uppercase;
          text-decoration: none;
        }
        .welcome {
          position: absolute;
          width: 711px;
          height: 143px;
          left: 97px;
          top: 527px;
          padding-top: 22px;
          font-family: 'Sora';
          font-style: normal;
          font-weight: 400;
          font-size: 22px;
          line-height: 28px;
 
          color: #606060;
 
        }
        .header img {
          float: left;
        }
        .header h1{
          position: relative;
          left: 8px;
          font-size: 30px;
          font-weight: bold;
        }
        .footer {
          position: absolute;
          width: 711px;
          height: 143px;
          left: 97px;
          top: 733px;
 
          font-family: 'Sora';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
 
          color: #606060;
        }

        @media screen and (min-width: 1080px) {
            .logo {
              width: 53px;
              height: 46px;
            }
            .logo-name {
              width: 107px;
              height: 17px;
            }
            .desc {
              font-size: 19px;
            }
            .btn {
              width: 119px;
            }
            .btn-text {
              font-size: 12px;
            }
            .welcome {
              font-size: 20px;
            }
        }
      </style>
    </head>
 
    <body>
    <div class="header"><img src=${imgsrc}> <h1>Slack</h1></div>
    <h2>Comfirm your email address to started on slack</h2>
    
        <p class="desc">
          Once you've confirmed that ${to} is your 
          email address, we'll help you find your Slack workspace or create a
          new one.
        </p>
        <p>
        <b>📱 From your mobile device,</b> tab the button below to confirm:
        </p>
        <button class="btn"><a href="${url}" class="btn-text" style="color:#000000">Confirm Email Address</a></button>
        <p class="welcome">
          If you didn't request this email, there's nothing to worry about - you can safely ignore it.
        </p>
        <hr></hr>

        <p class="footer">
         Did you receive this email without signing up? <a href="#link"> Click here</a> This link will expire in 24 hours.
        </p>
    </body>
  </html>`,
    };
    smtpTransport.sendMail(mailOptions, (err, infor) => {
      if (err) return err;
      return infor;
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
