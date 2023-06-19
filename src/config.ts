import { SomeCompanionConfigField } from '@companion-module/base'

export interface DeviceConfig {
	host?: string
	port?: string
	secure?: boolean
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'sender',
			label: 'Sender',
			width: 12,
		},
		{
			type: 'number',
			id: 'port',
			label: 'Port',
			default: 465,
			min: 1,
			max: 65535,
			width: 6,
		},
		{
			type: 'checkbox',
			id: 'secure',
			label: 'Secure',
			default: true,
			width: 6,
		}
	]
}
