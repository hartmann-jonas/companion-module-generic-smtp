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
					required: true,
				},
				{
					type: 'textinput',
					id: 'bcc',
					label: 'Bcc Recipient',
				},
				{
					type: 'textinput',
					id: 'subject',
					label: 'Subject',
					required: true,
				},
				{
					type: 'textinput',
					id: 'message',
					label: 'Message',
					required: true,
				},
			],
			callback: async (event): Promise<void> => {
				const mailContent = event.options
				if (typeof mailContent.message === 'string' && typeof mailContent.recipient === 'string') {
					mailContent.message = await self.parseVariablesInString(mailContent.message)
						mailContent.recipient = mailContent.recipient.split(',')
						if (typeof mailContent.bcc === 'string' && mailContent.bcc) {
							console.log(mailContent.bcc)
							mailContent.bcc = mailContent.bcc.split(',')
						} else {
							delete mailContent.bcc
						}
						console.log(mailContent)
						self.sendEmail(mailContent).catch((e: string) => self.log('error', `an error occured while sending the email: ${e}`))
				}
			},
		},
	})
}
