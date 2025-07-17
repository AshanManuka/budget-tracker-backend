import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type IncomeDocument = Income & Document;

@Schema()
export class Income {
   @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ required: true , type: [{type : Types.ObjectId, ref: 'Category'}]})
    categoryId: string;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
