import { Injectable } from '@nestjs/common';
import { DateFilterDto } from '../companies/dtos/filters.dto';
import { Company } from '../companies/entity/company.entity';
import { TransfersRepository } from './transfers.repository';

@Injectable()
export class TransfersService {
    constructor(private readonly transfersRepository: TransfersRepository) { }

    async getCompaniesWithTransfers(query: DateFilterDto): Promise<Company[]> {
        const { fromDate, toDate } = this.getDateRange(query.fromDate, query.toDate);
        return await this.transfersRepository.getCompaniesWithTransfers(fromDate, toDate);
    }

    private getDateRange(fromDate?: string, toDate?: string): { fromDate: string; toDate: string } {
        const now = new Date();
        const defaultTo = toDate ?? now.toISOString();
        const defaultFrom = fromDate ?? new Date(now.setMonth(now.getMonth() - 1)).toISOString();
        return { fromDate: defaultFrom, toDate: defaultTo };
    }
}
