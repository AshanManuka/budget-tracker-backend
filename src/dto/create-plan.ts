import { IsNotEmpty } from "class-validator";


export class CreatePlanDto{
    
    @IsNotEmpty()
    name: string;

    description: string;

    @IsNotEmpty()
    requiredType: string;

    @IsNotEmpty()
    estimatePrice: number;
    
}