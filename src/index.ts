import { InstanceBase, InstanceStatus, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { UpdateActions, Mail } from './actions'
import { DeviceConfig, GetConfigFields } from './config'
import { UpgradeScripts } from './upgrades'
import { UpdateVariableDefinitions } from './variables'
import { UpdateFeedbacks } from './feedback'
//import { GetFeedbacksList } from './feedback'

import nodemailer from 'nodemailer'

class SMTPInstance extends InstanceBase<DeviceConfig> {
	private config: DeviceConfig

	constructor(internal: unknown) {
		super(internal)
		this.config = {}
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 */
	public async init(config: DeviceConfig): Promise<void> {
		this.updateStatus(InstanceStatus.Connecting)
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		// TODO: Implement new feedbacks, variables, presets
		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
	}

	/**
	 * Process an updated configuration array.
	 */
	async configUpdated(config: DeviceConfig) {
		this.config = config
	}

	/**
	 * Creates the configuration fields for web config.
	 */
	public getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	/**
	 * Clean up the instance before it is destroyed.
	 */
	public async destroy(): Promise<void> {
		this.log('debug', `destroy ${this.id}`)
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	public async sendEmail(mail: Mail) {
		const transporter = nodemailer.createTransport({
			host: String(this.config.host),
			port: Number(this.config.port),
			secure: Boolean(this.config.secure),
			auth: {
				user: String(this.config.user),
				pass: String(this.config.password),
			},
		})

		let mailDescription = {
			from: `${this.config.name} <${this.config.user}>`,
			to: mail.recipient,
			subject: mail.subject,
			text: mail.message,
		}

		// if we have someone in bcc add bcc to the mailDescription
		if (mail.bcc) {
			mailDescription.bcc = mail.bcc
		}

		const info = await transporter.sendMail(mailDescription)

		console.log('Message sent: ' + info.messageId)
	}
}

runEntrypoint(SMTPInstance, UpgradeScripts)
