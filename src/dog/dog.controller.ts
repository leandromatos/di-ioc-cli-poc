import { Inject } from '@/core/decorators'
import { DogService } from '@/dog/dog.service'

export class DogController {
  constructor(@Inject('DogService') private readonly dogService: DogService) {}

  getHello(): void {
    this.dogService.getHello()
  }
}
