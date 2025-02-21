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
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Company, Transfer],
    }),
    CompaniesModule
  ],
  controllers: [CompaniesController],
  providers: [],
})
export class AppModule { }
