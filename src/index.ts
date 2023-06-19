import { InstanceBase, InstanceStatus, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { UpdateActions } from './actions'
import { DeviceConfig, GetConfigFields } from './config'
import { UpgradeScripts } from './upgrades'
import { UpdateVariableDefinitions } from './variables'
//import { GetFeedbacksList } from './feedback'

import nodemailer from 'nodemailer'
import { UpdateFeedbacks } from './feedback'

class ControllerInstance extends InstanceBase<DeviceConfig> {
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
		console.log("Init")
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
	async configUpdated(config) {
		console.log("Config updated")
		this.config = config
	}

	/**
	 * Creates the configuration fields for web config.
	 */
	public getConfigFields(): SomeCompanionConfigField[] {
		console.log("Get config fields")
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

	public async sendMail(mail) {
		// send the mail
	}
}

runEntrypoint(ControllerInstance, UpgradeScripts)
