import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DateFilterDto } from './dtos/filters.dto';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { Company } from './entity/company.entity';

@Controller('companies')
export class CompaniesController {

    constructor(private readonly companiesService: CompaniesService) { }

    @Get('/transfers')
    async getCompaniesTransfers(@Query() query: DateFilterDto): Promise<Company[]> {
        this.validateDateRange(query.fromDate, query.toDate)
        return await this.companiesService.getCompaniesTransfers(query);
    }

    @Get('/enrollments')
    async getCompaniesEnrollments(@Query() query: DateFilterDto): Promise<Company[]> {
        this.validateDateRange(query.fromDate, query.toDate)
        return await this.companiesService.getCompaniesEnrollments(query);
    }

    @Post()
    async create(@Body() company: CreateCompanyDto): Promise<void> {
        return await this.companiesService.create(company);
    }

    private validateDateRange(fromDate: string, toDate: string): void {
        if (fromDate && toDate && Date.parse(fromDate) > Date.parse(toDate)) {
            throw new BadRequestException('fromDate no puede ser mayor que toDate');
        }
    }

}



