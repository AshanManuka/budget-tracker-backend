import { IsNotEmpty } from "class-validator";

export class CloseInvestmentDto{
    
    @IsNotEmpty()
    investmentId: string;

    @IsNotEmpty()
    interest: number;
}