import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DateFilterDto } from './dtos/filters.dto';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Company } from './entity/company.entity';
import { DateValidator } from '../common/validators/date.validator';

@Controller('companies')
export class CompaniesController {

    constructor(private readonly companiesService: CompaniesService) { }

    @Get('/enrollments')
    async getCompaniesByEnrollmentDate(@Query() query: DateFilterDto): Promise<Company[]> {
        DateValidator.validateRange(query.fromDate, query.toDate)
        return await this.companiesService.getCompaniesByEnrollmentDate(query);
    }

    @Post()
    async create(@Body() company: CreateCompanyDto): Promise<void> {
        return await this.companiesService.create(company);
    }

}



