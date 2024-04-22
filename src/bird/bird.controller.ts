import { BirdService } from '@/bird/bird.service'
import { Inject } from '@/core/decorators'

export class BirdController {
  constructor(@Inject('BirdService') private readonly birdService: BirdService) {}

  getHello(): void {
    this.birdService.getHello()
  }
}
