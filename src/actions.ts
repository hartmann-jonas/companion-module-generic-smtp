import { InstanceBase } from '@companion-module/base'
import { DeviceConfig } from './config'
import { type } from 'os'

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
					type: 'textinput',
					id: 'bcc',
					label: 'Bcc',
				},
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
				mailContent.recipient = mailContent.recipient.split(',')
				if (mailContent.message: Z) {
					mailContent.message = await self.parseVariablesInString(mailContent.message)
				}
				console.log(mailContent)
				self.sendEmail(mailContent).catch((e) => self.log('error', `an error occured when sending the email: ${e}`))
			},
		},
	})
}
