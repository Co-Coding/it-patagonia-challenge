import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    cuit: string;

    @IsNotEmpty()
    @IsString()
    company_name: string;

    @IsNotEmpty()
    @IsDateString()
    enrollment_date: string;

}