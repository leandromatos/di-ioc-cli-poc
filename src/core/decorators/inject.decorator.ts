import 'reflect-metadata'

import { Metadata } from '@/types/core/decorator'

export const Inject: (identifier: string) => ParameterDecorator =
  identifier => (target, propertyKey, parameterIndex) => {
    const existingInjects = (Reflect.getMetadata('design:injects', target) as Metadata[]) || []
    existingInjects.push({ parameterIndex, identifier })
    Reflect.defineMetadata('design:injects', existingInjects, target)
  }
