import { IsNotEmpty, IsString } from 'class-validator';
import { Income } from 'src/schemas/income.schema';

export class CreateIncomeDto {
    
    @IsNotEmpty()
    amount: number;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    categoryId: string;
}