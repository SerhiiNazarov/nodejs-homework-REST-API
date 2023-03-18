const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "serhii_nazarov@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmailNodemailer = async (data) => {
  const email = { ...data, from: "serhii_nazarov@meta.ua" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmailNodemailer;
