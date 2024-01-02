const sgMail = require('@sendgrid/mail');

const sendVerificationEmail = async ({name, email, verificationToken, origin})=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
    const htmlMessage = `<p>Please confirm your email by clicking following link: <a href="${verifyEmail}">Verify Email</a></p>`;

    const msg = {
        to:`${email}`,
        from:"musatir@gmail.com",
        subject:"Email Confirmation",
        html:`<h3>Hello ${name}</h3>
        ${htmlMessage}
        `,
    }
    const info = await sgMail.send(msg);
}

module.exports = sendVerificationEmail