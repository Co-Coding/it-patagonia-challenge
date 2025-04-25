import { Injectable } from '@nestjs/common';
import { DateFilterDto } from './dtos/filters.dto';
import { CompaniesRepository } from './companies.repository'
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Company } from './entity/company.entity';
import { ICompany } from './interfaces/company.interface';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly repository: CompaniesRepository
    ) { }

    private getDateRange(fromDate: string, toDate: string) {
        if (!fromDate || !toDate) {
            const today = new Date();
            const lastMonth = new Date();

            lastMonth.setMonth(today.getMonth() - 1)
            fromDate = lastMonth.toISOString();
            toDate = today.toISOString();

            return { fromDate, toDate }
        }
        return { fromDate, toDate }
    }

    async getCompaniesByEnrollmentDate(query: DateFilterDto): Promise<Company[]> {
        const { fromDate, toDate } = this.getDateRange(query.fromDate, query.toDate);
        return await this.repository.getCompaniesByEnrollmentDate(fromDate, toDate)
    }

    async create(company: ICompany): Promise<void> {
        return await this.repository.create(company)
    }
}
