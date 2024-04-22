import 'reflect-metadata'

import { program } from 'commander'

import { BirdController } from '@/bird/bird.controller'
import { registerBirdModule } from '@/bird/bird.module'
import { CatController } from '@/cat/cat.controller'
import { registerCatModule } from '@/cat/cat.module'
import { ConfigManager } from '@/core/config-manager'
import { DependencyContainer } from '@/core/dependency-container'
import { DogController } from '@/dog/dog.controller'
import { registerDogModule } from '@/dog/dog.module'
import { registerGlobalModule } from '@/global/global.module'

const container: DependencyContainer = new DependencyContainer()

registerGlobalModule(container)
registerBirdModule(container)
registerCatModule(container)
registerDogModule(container)

program
  .version('1.0.0')
  .description('Animal Services CLI')
  .option('--config [path]', 'Path to configuration file')
  .option('--verbose', 'Enable verbose logging')
  .option('--emoji', 'Enable emoji on output')
  .hook('preAction', async thisCommand => {
    const { config, ...commandOptions } = thisCommand.opts()
    const configManager: ConfigManager = ConfigManager.getInstance()
    await configManager.loadConfig(commandOptions, config)
  })

program
  .command('cat:hello')
  .description('Output a greeting from a cat')
  .action(() => {
    const catController = container.resolve<CatController>('CatController')
    catController.getHello()
  })

program
  .command('dog:hello')
  .description('Output a greeting from a dog')
  .action(() => {
    const dogController = container.resolve<DogController>('DogController')
    dogController.getHello()
  })

program
  .command('bird:hello')
  .description('Output a greeting from a bird')
  .action(() => {
    const birdController = container.resolve<BirdController>('BirdController')
    birdController.getHello()
  })

program.parse(process.argv)
