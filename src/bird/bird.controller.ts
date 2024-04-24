import { BirdService } from '@/bird/bird.service'
import { Inject } from '@/core/decorators'
import { Injectable } from '@/core/decorators/injectable.decorator'

@Injectable()
export class BirdController {
  constructor(@Inject('BirdService') private readonly birdService: BirdService) {}

  getHello(): void {
    this.birdService.getHello()
  }
}
