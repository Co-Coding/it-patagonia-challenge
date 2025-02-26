import { Module } from '@nestjs/common';
import { CompaniesController } from './companies/company.controller';
import { CompaniesModule } from './companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './companies/entity/company.entity';
import { Transfer } from './companies/entity/transfer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_J3yzcHN0mMZK@ep-cool-water-a4v91glv-pooler.us-east-1.aws.neon.tech/it-patagonia?sslmode=require',
      entities: [Company, Transfer],
      synchronize: false,
    }),
    CompaniesModule
  ],
  controllers: [CompaniesController],
  providers: [],
})
export class AppModule { }
