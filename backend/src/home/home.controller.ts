import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { HomeService } from './home.service';
import { GeneralStatisticsDto } from './dto/general-statistics.dto';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  appInfo() {
    return this.service.appInfo();
  }

  @Get('statistics')
  @ApiOkResponse({
    type: GeneralStatisticsDto,
    description:
      'General statistics including users, sprints, tasks, KPIs, and risks',
  })
  async getGeneralStatistics(): Promise<GeneralStatisticsDto> {
    return this.service.getGeneralStatistics();
  }
}
