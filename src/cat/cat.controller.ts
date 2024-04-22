import { CatService } from '@/cat/cat.service'
import { Inject } from '@/core/decorators'

export class CatController {
  constructor(@Inject('CatService') private readonly catService: CatService) {}

  getHello(): void {
    this.catService.getHello()
  }
}
