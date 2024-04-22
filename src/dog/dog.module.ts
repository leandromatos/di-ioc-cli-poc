import { DependencyContainer } from '@/core/dependency-container'
import { DogController } from '@/dog/dog.controller'
import { DogService } from '@/dog/dog.service'

export const registerDogModule = (container: DependencyContainer): void => {
  container.registerProvider('DogService', DogService)
  container.registerProvider('DogController', DogController)
}

export { DogController, DogService }
