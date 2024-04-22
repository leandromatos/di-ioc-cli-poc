import { BirdController } from '@/bird/bird.controller'
import { BirdService } from '@/bird/bird.service'
import { DependencyContainer } from '@/core/dependency-container'

export const registerBirdModule = (container: DependencyContainer): void => {
  container.registerProvider('BirdService', BirdService)
  container.registerProvider('BirdController', BirdController)
}

export { BirdController, BirdService }
