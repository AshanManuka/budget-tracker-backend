import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CreditDocument = Credit & Document;

@Schema()
export class Credit{
    @Prop()
    creditAmount: number;

    @Prop()
    fromName: string;

    @Prop()
    reason: string;

    @Prop()
    dueDate: Date;

    @Prop()
    settledDate: Date;

    @Prop()
    status: String;

    @Prop()
    installment: number;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: string;
}

export const CreditSchema = SchemaFactory.createForClass(Credit);