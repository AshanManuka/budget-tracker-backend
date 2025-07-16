import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    status: String;
}

export const CreditSchema = SchemaFactory.createForClass(Credit);