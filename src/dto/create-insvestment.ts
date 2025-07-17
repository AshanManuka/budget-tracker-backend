import { IsNotEmpty, IsString } from "class-validator";


export class createInvestmentDto{

    @IsNotEmpty()
    @IsString()
    investmentType : String;

    @IsNotEmpty()
    @IsString()
    description : String;

    @IsNotEmpty()
    amount : number;

    @IsNotEmpty()
    startDate : Date;

}