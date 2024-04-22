import 'reflect-metadata'

export const Injectable = (): ClassDecorator => {
  return function (constructor: object) {
    console.log('Injectable decorator called', constructor)
    const paramTypes = Reflect.getMetadata('design:paramtypes', constructor)
    if (paramTypes) {
      Reflect.defineMetadata('design:paramtypes', paramTypes, constructor)
    } else {
      // Optionally handle or log cases where no params are found
    }
  }
}
