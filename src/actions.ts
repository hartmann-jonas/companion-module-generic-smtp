import { InstanceBase } from '@companion-module/base'
import { DeviceConfig } from './config'

export interface Mail {
	recipient: string
	bcc: string
	subject: string
	message: string
}

export function UpdateActions(self: InstanceBase<DeviceConfig>) {
	self.setActionDefinitions({
		sendMail: {
			name: 'Send email',
			description: 'Seperate multiple recipients with commas.',
			options: [
				{
					type: 'textinput',
					id: 'recipient',
					label: 'Recipient',
				},
				{
					type: 'checkbox',
					id: 'bccCheck',
					label: 'BCC',
					default: true,
				},
				/* {
					type: 'textinput',
					id: 'bcc',
					label: 'Bcc Recipient',
					isVisible: (options) => options.bccCheck = true,
					width: 10,
				}, */
				{
					type: 'textinput',
					id: 'subject',
					label: 'Subject',
				},
				{
					type: 'textinput',
					id: 'message',
					label: 'Message',
				},
			],
			callback: async (event): Promise<void> => {
				const mailContent = event.options
				if (typeof mailContent.message === 'string' && typeof mailContent.recipient === 'string') {
					mailContent.message = await self.parseVariablesInString(mailContent.message)
						mailContent.recipient = mailContent.recipient.split(',')
						if (mailContent.bccCheck = true && typeof mailContent.bcc === 'string') {
							mailContent.bcc = mailContent.bcc.split(',')
						} else {
							delete mailContent.bcc
						}
						console.log(mailContent)
						self.sendEmail(mailContent).catch((e) => self.log('error', `an error occured when sending the email: ${e}`))
				}
			},
		},
	})
}
