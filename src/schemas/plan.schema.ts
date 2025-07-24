import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';

export type PlanDocument = Plan & Document;

@Schema()
export class Plan{

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    requiredType: string;

    @Prop()
    estimatePrice: number;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: string;


}

export const PlanSchema = SchemaFactory.createForClass(Plan);