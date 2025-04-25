import { Controller, Get, Query } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { Company } from '../companies/entity/company.entity';
import { DateFilterDto } from '../companies/dtos/filters.dto';
import { DateValidator } from '../common/validators/date.validator';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) { }

  @Get()
  async getCompaniesWithTransfers(@Query() query: DateFilterDto): Promise<Company[]> {
    DateValidator.validateRange(query.fromDate, query.toDate);
    return await this.transfersService.getCompaniesWithTransfers(query);
  }

}
