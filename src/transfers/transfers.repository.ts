import { Injectable } from '@nestjs/common';
import { Company } from '../companies/entity/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from './entity/transfer.entity';

@Injectable()
export class TransfersRepository {
    constructor(
        @InjectRepository(Transfer)
        private readonly repository: Repository<Transfer>,
    ) { }

    async getCompaniesWithTransfers(fromDate: string, toDate: string): Promise<Company[]> {
        const query = `
        SELECT DISTINCT c.*
        FROM companies c
        INNER JOIN transfers t ON t.company_id = c.id
        WHERE t."createdAt" BETWEEN $1 AND $2
      `;

        return await this.repository.query(query, [fromDate, toDate]);
    }
}