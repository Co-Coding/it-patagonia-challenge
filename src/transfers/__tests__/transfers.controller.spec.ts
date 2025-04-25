import { Test, TestingModule } from '@nestjs/testing';
import { TransfersController } from '../transfers.controller';
import { TransfersService } from '../transfers.service';
import { BadRequestException } from '@nestjs/common';
import { Company } from '../../companies/entity/company.entity';
import { DateValidator } from '../../common/validators/date.validator';

describe('TransfersController', () => {
    let transfersController: TransfersController;
    let transfersService: TransfersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransfersController],
            providers: [
                {
                    provide: TransfersService,
                    useValue: {
                        getCompaniesWithTransfers: jest.fn()
                    },
                },
            ],
        }).compile();

        transfersController = module.get<TransfersController>(TransfersController);
        transfersService = module.get<TransfersService>(TransfersService);
    });

    describe('getCompaniesWithTransfers', () => {
        it('should call validateDateRange and return companies transfers', async () => {
            const query = { fromDate: '2025-02-10T20:46:23Z', toDate: '2025-02-20T20:46:23Z' };
            const resultMock: Company[] = [];

            jest.spyOn(transfersService, 'getCompaniesWithTransfers').mockResolvedValue(resultMock);

            const res = await transfersController.getCompaniesWithTransfers(query)

            expect(res).toBe(resultMock);
            expect(transfersService.getCompaniesWithTransfers).toHaveBeenCalledWith(query);
        });

        it('should throw BadRequestException if DateValidator throws', async () => {
            const query = { fromDate: '2025-02-25T20:46:23Z', toDate: '2025-02-20T20:46:23Z' };

            jest.spyOn(DateValidator, 'validateRange').mockImplementation(() => {
                throw new BadRequestException('mocked error');
            });

            await expect(transfersController.getCompaniesWithTransfers(query)).rejects.toThrow(BadRequestException);
        });
    });

});
