import {
	CompanionActionDefinitions,
	InstanceBase,
} from '@companion-module/base'
import { DeviceConfig } from './config'

export function UpdateActions(self: InstanceBase<DeviceConfig>): CompanionActionDefinitions {
	console.log("The actions are not working")
	const actions = {
		['sendmail']: {
			name: 'Send email',
			description: 'Send an email to a recipient',
			options: [
				/* {
					id: 'val',
					type: 'textinput',
					label: 'Provide name',
					'default': 'Bob'
				}
				{
					type: 'textinput',
					id: 'reciever',
					label: 'Reciever',
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
				} */
			],
			callback: (event): void => {
				event = event.options
				console.log(event)
				//self.sendMail(event)
			}
		},
	}

	return actions
}
