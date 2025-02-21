import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from '../companies.service';
import { CompaniesRepository } from '../companies.repository'
import { Company } from '../entity/company.entity';
import { ICompany } from '../interfaces/company.interface';

describe('CompaniesService', () => {
    let service: CompaniesService;
    let repository: CompaniesRepository;

    const mockCompanyRepository = {
        getCompaniesTransfers: jest.fn(),
        getCompaniesEnrollments: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompaniesService,
                { provide: CompaniesRepository, useValue: mockCompanyRepository },
            ],
        }).compile();

        service = module.get<CompaniesService>(CompaniesService);
        repository = module.get<CompaniesRepository>(CompaniesRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCompaniesTransfers', () => {
        it('should return an array of companies', async () => {
            const query = { fromDate: '2025-02-10T17:46:00.000Z', toDate: '2025-02-21T17:46:00.000Z' };
            const result: Company[] = [{
                id: 1,
                cuit: "1234567890",
                company_name: "Breaking SA",
                enrollment_date: new Date("2025-02-20T17:46:00.000Z"),
                createdAt: new Date("2025-02-20T20:46:41.000Z"),
            }];

            mockCompanyRepository.getCompaniesTransfers.mockResolvedValue(result);

            expect(await service.getCompaniesTransfers(query)).toBe(result);
            expect(mockCompanyRepository.getCompaniesTransfers).toHaveBeenCalled;
        });

        it('should use default date range if fromDate or toDate is not provided', async () => {
            const query = { fromDate: undefined, toDate: undefined };
            const result: Company[] = [];

            mockCompanyRepository.getCompaniesTransfers.mockResolvedValue(result);

            expect(await service.getCompaniesTransfers(query)).toBe(result);
            expect(mockCompanyRepository.getCompaniesTransfers).toHaveBeenCalled;
        });
    });

    describe('create', () => {
        it('should create a company', async () => {
            const company: ICompany = { cuit: '1234567', company_name: 'Breaking SA', "enrollment_date": "2025-02-20T17:46:00Z" };

            await service.create(company);
            expect(mockCompanyRepository.create).toHaveBeenCalled;
        });
    });
});
