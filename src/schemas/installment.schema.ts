import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

export type InstallmentType = Installment & Document;

@Schema()
export class Installment{

    @Prop()
    amount: number;

    @Prop()
    paidDate: Date;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Credit' })
    loanId: string;

}

export const InstallmentSchema = SchemaFactory.createForClass(Installment);