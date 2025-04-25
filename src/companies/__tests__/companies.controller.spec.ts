import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from '../company.controller';
import { CompaniesService } from '../companies.service';
import { Company } from '../entity/company.entity';
import { BadRequestException } from '@nestjs/common';

describe('CompaniesController', () => {
    let companiesController: CompaniesController;
    let companiesService: CompaniesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CompaniesController],
            providers: [
                {
                    provide: CompaniesService,
                    useValue: {
                        getCompaniesByEnrollmentDate: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        companiesController = module.get<CompaniesController>(CompaniesController);
        companiesService = module.get<CompaniesService>(CompaniesService);
    });

    describe('getCompaniesByEnrollmentDate', () => {
        it('should return the list of companies enrolled in the given date range', async () => {
            const query = { fromDate: '2025-03-01', toDate: '2025-03-31' };
            const mockResult: Company[] = [
                { id: 1, company_name: 'Breaking SA', enrollment_date: new Date('2025-03-05'), cuit: '133131', createdAt: new Date('2025-02-01') },
            ];

            jest.spyOn(companiesService, 'getCompaniesByEnrollmentDate').mockResolvedValue(mockResult);

            const result = await companiesController.getCompaniesByEnrollmentDate(query);

            expect(result).toBe(mockResult);
            expect(companiesService.getCompaniesByEnrollmentDate).toHaveBeenCalledWith(query);
        });

        it('should throw BadRequestException if fromDate is greater than toDate', async () => {
            const query = { fromDate: '2025-04-10', toDate: '2025-04-01' };

            await expect(companiesController.getCompaniesByEnrollmentDate(query)).rejects.toThrow(BadRequestException);
        });
    });


});
