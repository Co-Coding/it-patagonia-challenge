import { IsISO8601, IsOptional } from "class-validator";

export class DateFilterDto {

    @IsOptional()
    @IsISO8601()
    fromDate?: string;

    @IsOptional()
    @IsISO8601()
    toDate?: string;

}