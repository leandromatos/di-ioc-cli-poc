import { ConfigManager } from '@/core/config-manager'
import { Inject } from '@/core/decorators'
import { LoggerService } from '@/core/log/log.service'

export class CatService {
  private readonly logger: LoggerService = new LoggerService('CatService')

  constructor(@Inject('ConfigManager') private readonly configManager: ConfigManager) {}

  getHello(): void {
    const withEmoji = this.configManager.getConfig<boolean>('emoji')
    const hello = 'Hello, I am a cat!'
    if (withEmoji) return this.logger.log('🐱', hello)

    return this.logger.log(hello)
  }
}
