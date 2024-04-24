import 'reflect-metadata'

import { Constructable, Provider } from '@/types/core/dependency-container'

export class DependencyContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is a generic container, so we need to use `any`.
  private dependencies: Map<string, Provider<any>> = new Map()

  registerProvider<T>(identifier: string, provider: Provider<T>): void {
    this.dependencies.set(identifier, provider)
  }

  resolve<T>(identifier: string): T {
    const provider = this.dependencies.get(identifier)
    if (!provider) throw new Error(`Dependency not registered: ${identifier}`)

    return this.resolveProvider(provider) as T
  }

  private resolveProvider<T>(provider: Provider<T>): T {
    if (this.isConstructor(provider)) return this.resolveConstructor(provider)
    if (this.isFunction(provider)) return this.resolveFunction(provider)

    throw new Error('Invalid provider')
  }

  private isConstructor<T>(provider: Provider<T>): provider is Constructable<T> {
    return typeof provider === 'function' && /^class\s/.test(provider.toString())
  }

  private isFunction<T>(provider: Provider<T>): provider is () => T {
    return typeof provider === 'function' && !/^class\s/.test(provider.toString())
  }

  private resolveConstructor<T>(provider: Constructable<T>): T {
    const params = this.getConstructorParams<T>(provider)
    console.log(`Resolving constructor for ${provider.name}, with params:`, params)

    return new provider(...params)
  }

  private getConstructorParams<T>(constructor: Constructable<T>): Array<T> {
    const paramTypes: Constructable<T>[] = Reflect.getMetadata('design:paramtypes', constructor) || []
    console.log(
      `Constructor params for ${constructor.name}:`,
      paramTypes.map(type => type.name),
    )

    return paramTypes.map(type => this.resolve<T>(type.name))
  }

  private resolveFunction<T>(provider: () => T): T {
    return provider()
  }
}
