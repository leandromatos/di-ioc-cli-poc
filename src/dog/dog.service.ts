import { ConfigManager } from '@/core/config-manager'
import { Inject } from '@/core/decorators'
import { LoggerService } from '@/core/log/log.service'

export class DogService {
  private readonly logger: LoggerService = new LoggerService('DogService')

  constructor(@Inject('ConfigManager') private readonly configManager: ConfigManager) {
    this.logger.log('DogService initialized')
  }

  getHello(): void {
    const withEmoji = this.configManager.getConfig<boolean>('emoji')
    const hello = 'Hello, I am a dog!'
    if (withEmoji) return this.logger.log('🐶', hello)

    return this.logger.log(hello)
  }
}
