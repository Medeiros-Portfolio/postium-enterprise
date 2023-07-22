import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rafaelmedrib@gmail.com',
      pass: process.env.BREVO_KEY,
    },
  })

  const info = await transporter.sendMail({
    from: '"Postium" <rafaelmedrib@gmail.com>',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  return info
}
