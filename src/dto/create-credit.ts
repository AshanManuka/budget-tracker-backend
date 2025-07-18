import { IsNotEmpty } from "class-validator";


export class CreateCreditDto{

    @IsNotEmpty()
    creditAmount: number;

    @IsNotEmpty()
    fromName: string;

    @IsNotEmpty()
    reason: string;

    @IsNotEmpty()
    dueDate: Date;

    @IsNotEmpty()
    status: String;
}