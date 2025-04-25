import { BadRequestException } from '@nestjs/common';

export class DateValidator {
    static validateRange(fromDate?: string, toDate?: string): void {
        if (fromDate && toDate && Date.parse(fromDate) > Date.parse(toDate)) {
            throw new BadRequestException('fromDate no puede ser mayor que toDate');
        }
    }
}