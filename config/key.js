const nodemailer = require("nodemailer");
module.exports = {
  mongoURI: "mongodb://localhost:27017/hanaph",
  // "mongodb://admin:admin123@ds149744.mlab.com:49744/hanaph",
  secretOrkey: "swulutions",
  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "HanaPH2019@gmail.com",
      pass: "hanaph2019"
    },
    tls: {
      rejectUnauthorized: false
    }
  })
};
