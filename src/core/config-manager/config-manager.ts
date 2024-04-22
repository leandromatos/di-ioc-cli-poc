import { defaultConfig } from '@/config/default.config'
import { ConfigReader } from '@/core/config-manager/config-reader'
import { LoggerService } from '@/core/log/log.service'
import { CommandOptions, Config } from '@/types/core/config-manager'

export class ConfigManager {
  private static instance: ConfigManager
  private readonly defaultConfig: Config = defaultConfig
  private readonly configReader: ConfigReader = new ConfigReader()
  private readonly logger: LoggerService = new LoggerService('ConfigManager')
  private config: Config = this.defaultConfig

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) ConfigManager.instance = new ConfigManager()

    return ConfigManager.instance
  }

  async loadConfig(commandOptions: CommandOptions, configPath?: string): Promise<void> {
    try {
      if (!configPath) throw new Error('No config file path provided')
      const configFromFile = await this.configReader.readConfigFile(configPath)
      this.config = { ...this.defaultConfig, ...configFromFile, ...commandOptions }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      this.config = { ...this.defaultConfig, ...commandOptions }
      if (this.config.verbose) {
        this.logger.log('Failed to load config: %s.', errorMessage)
        this.logger.log('Using default config instead.')
      }
    }
  }

  getConfig<T>(key: keyof Config): T | undefined {
    const configValue = this.config[key]
    if (configValue === undefined) {
      this.logger.log(`Config value for key '%s' not found`, key)

      return undefined
    }

    return configValue as T
  }
}
