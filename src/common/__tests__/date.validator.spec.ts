import { BadRequestException } from "@nestjs/common";
import { DateValidator } from "../validators/date.validator";

describe('DateValidator', () => {
    it('should throw BadRequestException if fromDate > toDate', () => {
        const fromDate = '2025-03-10T20:46:23Z';
        const toDate = '2025-02-20T20:46:23Z';

        expect(() => DateValidator.validateRange(fromDate, toDate)).toThrow(BadRequestException);
    });

    it('should not throw if fromDate < toDate', () => {
        const fromDate = '2025-02-10T20:46:23Z';
        const toDate = '2025-02-20T20:46:23Z';

        expect(() => DateValidator.validateRange(fromDate, toDate)).not.toThrow();
    });
});
