import { CatController } from '@/cat/cat.controller'
import { CatService } from '@/cat/cat.service'
import { DependencyContainer } from '@/core/dependency-container'

export const registerCatModule = (container: DependencyContainer): void => {
  container.registerProvider('CatService', CatService)
  container.registerProvider('CatController', CatController)
}

export { CatController, CatService }
