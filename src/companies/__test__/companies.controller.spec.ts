import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from '../company.controller';
import { CompaniesService } from '../companies.service';
import { BadRequestException } from '@nestjs/common';
import { Company } from '../entity/company.entity';

describe('CompaniesController', () => {
    let controller: CompaniesController;
    let service: CompaniesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CompaniesController],
            providers: [
                {
                    provide: CompaniesService,
                    useValue: {
                        getCompaniesTransfers: jest.fn(),
                        getCompaniesEnrollments: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CompaniesController>(CompaniesController);
        service = module.get<CompaniesService>(CompaniesService);
    });

    describe('getCompaniesTransfers', () => {
        it('should call validateDateRange and return companies transfers', async () => {
            const query = { fromDate: '2025-02-10T20:46:23Z', toDate: '2025-02-20T20:46:23Z' };
            const resultMock: Company[] = [];

            jest.spyOn(service, 'getCompaniesTransfers').mockResolvedValue(resultMock);

            const res = await controller.getCompaniesTransfers(query)

            expect(res).toBe(resultMock);
            expect(service.getCompaniesTransfers).toHaveBeenCalledWith(query);
        });

        it('should throw BadRequestException if fromDate > toDate', async () => {
            const query = { fromDate: '2025-02-25T20:46:23Z', toDate: '2025-02-20T20:46:23Z' };
            await expect(controller.getCompaniesTransfers(query)).rejects.toThrow(BadRequestException);
        });
    });

});
