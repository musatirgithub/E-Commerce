const sgMail = require('@sendgrid/mail');

const sendResetPasswordEmail = async ({name, email, token, origin})=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const resetUrl = `${origin}/user/reset-password?token=${token}&email=${email}`;
    const htmlMessage = `<p>Please reset password by clicking the following link : <a href="${resetUrl}">Reset Password</a></p>`;
    const msg = {
        to:email,
        from:"musatir@gmail.com",
        subject:"Reset Password",
        html:`<h3>Hello ${name}</h3>
        ${htmlMessage}
        `,
    }
    const info = await sgMail.send(msg);
}

module.exports = sendResetPasswordEmail