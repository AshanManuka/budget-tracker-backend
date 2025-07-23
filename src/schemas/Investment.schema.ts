import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose'

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

    @Prop()
    clodeDate : Date;

    @Prop()
    interest: number;

    @Prop({required: true})
    status: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: string;

}

export const InvestmentSchema  = SchemaFactory.createForClass(Investment);