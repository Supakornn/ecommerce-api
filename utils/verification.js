const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({ name, email, verificationToken, origin }) => {
  const verifyEmail = `${origin}/user/verify?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking the link below: 
  <a href="${verifyEmail}">Verify Email<a/></p>`;
  return sendEmail({
    to: email,
    subject: "Verify Email",
    html: `<h4>Hello, ${name}</h4>
    ${message}`
  });
};

module.exports = sendVerificationEmail;
