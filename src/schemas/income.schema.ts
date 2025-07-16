import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type IncomeDocument = Income & Document;

@Schema()
export class Income {
    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    source: string;

    @Prop({ required: true })
    date: Date;

    @Prop()
    description?: string;

    @Prop({ required: true, type: [{ type: String, ref: 'Category' }] })
    categoryId: string;
}
export const IncomeSchema = SchemaFactory.createForClass(Income);