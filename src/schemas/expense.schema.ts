import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    reason: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true , type: [{type : Types.ObjectId, ref: 'Category'}]})
    categoryId: string;

}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);