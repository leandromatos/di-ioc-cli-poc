import { describe, expect, it, vi } from 'vitest'

import { registerBirdModule } from '@/bird/bird.module'
import { CatController, registerCatModule } from '@/cat/cat.module'
import { DependencyContainer } from '@/core/dependency-container'
import { registerDogModule } from '@/dog/dog.module'
import { registerGlobalModule } from '@/global/global.module'
import { Provider } from '@/types/core/dependency-container'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Overrides = Record<string, Provider<any> | undefined>

/**
 * Creates a testing module by setting up the dependency container with the option to override providers.
 * @param overrides A map of provider identifiers and their corresponding mock or replacement functions.
 * @returns Configured DependencyContainer for testing.
 */
const createTestingModule = (overrides: Overrides = {}): DependencyContainer => {
  const container = new DependencyContainer()

  // Register default modules
  registerGlobalModule(container)
  registerBirdModule(container)
  registerCatModule(container)
  registerDogModule(container)

  // Apply overrides
  Object.keys(overrides).forEach(identifier => {
    if (overrides[identifier]) {
      container.registerProvider(identifier, overrides[identifier]!)
    }
  })

  return container
}

// Example usage in a test
describe('CatController Tests', () => {
  it('should call getHello', () => {
    const mockHello = vi.fn()
    const container = createTestingModule({
      CatController: () => ({ getHello: mockHello }),
    })

    const catController = container.resolve<CatController>('CatController')
    catController.getHello()
    expect(mockHello).toHaveBeenCalled()
  })
})
