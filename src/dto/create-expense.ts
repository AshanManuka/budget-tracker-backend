import { IsNotEmpty, IsString } from 'class-validator';
import { Expense } from 'src/schemas/expense.schema';

export class CreateExpenseDto {
    
    @IsNotEmpty()
    amount: number;
    
    @IsNotEmpty()
    @IsString()
    reason: string;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    categoryId: string;
}