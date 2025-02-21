import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICompany } from './types/company.type';

@Injectable()
export class CompaniesRepository {
    constructor(
        @InjectRepository(Company) private readonly repository: Repository<Company>
    ) { }

    async getCompaniesTransfers(fromDate: string, toDate: string): Promise<Company[]> {
        return await this.repository.createQueryBuilder('company')
            .innerJoin('company.transfers', 'transfer')
            .where('transfer.createdAt BETWEEN :fromDate AND :toDate', { fromDate, toDate })
            .getMany();
    }

    async getCompaniesEnrollments(fromDate: string, toDate: string) {
        return this.repository.createQueryBuilder('company')
            .where('company.enrollment_date BETWEEN :fromDate AND :toDate', { fromDate, toDate })
            .getMany();
    }

    async create(company: ICompany): Promise<void> {
        await this.repository.save(company)
    }
}
