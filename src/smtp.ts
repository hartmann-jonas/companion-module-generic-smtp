import { Mail } from './actions'
import { DeviceConfig } from './config'
import nodemailer from 'nodemailer'

export async function sendMail(config: DeviceConfig,mail: Mail) {
	console.log(config)
	const transporter = nodemailer.createTransport({
		host: config.host,
		port: config.port,
		secure: config.secure,
		auth: {
			user: config.user,
			pass: config.password,
		},
	})

	if (mail.bcc != undefined) {
		const info = await transporter.sendMail({
			from: `${config.name} <${config.user}>`,
			to: mail.recipient,
			bcc: mail.bcc,
			subject: mail.subject,
			text: mail.message,
		})
		console.log('Message sent: ' + info.messageId)
	} else {
		const info = await transporter.sendMail({
			from: `${config.name} <${config.user}>`,
			to: mail.recipient,
			subject: mail.subject,
			text: mail.message,
		})
		console.log('Message sent: ' + info.messageId)
	}
}
