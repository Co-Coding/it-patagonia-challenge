import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICompany } from './interfaces/company.interface';
import { POSTGRES_ERROR_CODES } from '../common/constants/postgres-error-codes';
import { COMPANY_FIELDS } from '../common/constants/company-fields';

@Injectable()
export class CompaniesRepository {
    constructor(
        @InjectRepository(Company) private readonly repository: Repository<Company>
    ) { }

    async getCompaniesByEnrollmentDate(fromDate: string, toDate: string) {
        return this.repository.createQueryBuilder('company')
            .where('company.enrollment_date BETWEEN :fromDate AND :toDate', { fromDate, toDate })
            .getMany();
    }

    async getCompanyByName(company_name: string): Promise<Company> {
        return await this.repository.findOneBy({ company_name });
    }

    async create(company: ICompany): Promise<void> {
        try {
            await this.repository.save(company);
        } catch (error) {
            if (error.code === POSTGRES_ERROR_CODES.UNIQUE_VIOLATION) {
                if (error.detail.includes(COMPANY_FIELDS.CUIT)) {
                    throw new ConflictException('Company with this CUIT already exists.');
                }
                if (error.detail.includes(COMPANY_FIELDS.NAME)) {
                    throw new ConflictException('Company with this name already exists.');
                }
                throw new ConflictException('Company already exists.');
            }
        }
    }

}
