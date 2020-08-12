const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c0d1f1a0818176",
    pass: "298f90a88106de"
  }
})

