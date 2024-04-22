import { ConfigManager } from '@/core/config-manager'
import { DependencyContainer } from '@/core/dependency-container'

export const registerGlobalModule = (container: DependencyContainer): void => {
  container.registerProvider('ConfigManager', () => ConfigManager.getInstance())
}
