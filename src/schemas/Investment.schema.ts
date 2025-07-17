import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type InvestmentDocument = Investment & Document;

@Schema()
export class Investment{

    @Prop({required : true})
    investmentType : String;
    
    @Prop({required : true})
    description : String;
    
    @Prop({required : true})
    amount : number;
    
    @Prop({required : true})
    startDate : Date;

}

export const InvestmentSchema  = SchemaFactory.createForClass(Investment);