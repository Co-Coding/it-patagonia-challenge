import { Module } from '@nestjs/common';
import { CompaniesController } from './companies/company.controller';
import { CompaniesModule } from './companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './companies/entity/company.entity';
import { Transfer } from './transfers/entity/transfer.entity';
import { TransfersModule } from './transfers/transfers.module';
import { envs } from './config/common/envs';
import { TransfersController } from './transfers/transfers.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envs.databaseUrl,
      entities: [Company, Transfer],
      synchronize: false,
    }),
    CompaniesModule,
    TransfersModule
  ],
  controllers: [CompaniesController, TransfersController],
  providers: [],
})
export class AppModule { }
