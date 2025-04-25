import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './company.controller';
import { CompaniesRepository } from './companies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company])
    ],
    controllers: [CompaniesController],
    providers: [CompaniesService, CompaniesRepository],
    exports: [CompaniesRepository, CompaniesService]
})
export class CompaniesModule { }

