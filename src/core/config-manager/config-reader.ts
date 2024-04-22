import { readFile } from 'fs-extra'

import { Config } from '@/types/core/config-manager'

export class ConfigReader {
  async readConfigFile(filePath: string): Promise<Config> {
    try {
      const data = await readFile(filePath, 'utf8')

      return JSON.parse(data) as Config
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
