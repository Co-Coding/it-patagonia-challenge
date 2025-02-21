import { Injectable } from '@nestjs/common';
import { DateFilterDto } from './dtos/filters.dto';
import { CompaniesRepository } from './companies.repository'
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { Company } from './entity/company.entity';
import { ICompany } from './interfaces/company.interface';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly repository: CompaniesRepository
    ) { }

    private getDateRage(fromDate: string, toDate: string) {
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

    async getCompaniesTransfers(query: DateFilterDto): Promise<Company[]> {
        const { fromDate, toDate } = this.getDateRage(query.fromDate, query.toDate);
        return await this.repository.getCompaniesTransfers(fromDate, toDate);
    }

    async getCompaniesEnrollments(query: DateFilterDto): Promise<Company[]> {
        const { fromDate, toDate } = this.getDateRage(query.fromDate, query.toDate);
        return await this.repository.getCompaniesEnrollments(fromDate, toDate)
    }

    async create(company: ICompany): Promise<void> {
        return await this.repository.create(company)
    }
}
