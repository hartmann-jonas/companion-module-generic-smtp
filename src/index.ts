import { InstanceBase, InstanceStatus, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { UpdateActions, Mail } from './actions'
import { DeviceConfig, GetConfigFields } from './config'
import { UpgradeScripts } from './upgrades'
import { UpdateVariableDefinitions } from './variables'
import { UpdateFeedbacks } from './feedback'
//import { GetFeedbacksList } from './feedback'


class SMTPInstance extends InstanceBase<DeviceConfig> {
	config: DeviceConfig

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
}

export = SMTPInstance

runEntrypoint(SMTPInstance, UpgradeScripts)
