import { Controller, Get } from '@nestjs/common';
import { TypedRoute } from '@nestia/core';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TypedRoute.Get()
  getData() {
    return this.appService.getData();
  }
}
