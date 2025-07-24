import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type AccountDocument = Account & Document;

@Schema()
export class Account{

    @Prop()
    mainBalance: number;

    @Prop()
    savingsBalance: number;

    @Prop()
    creditBalance: number;

    @Prop()
    investmentBalance: number;

    @Prop()
    plannedBudget: number;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: string;

}

export const AccountSchema = SchemaFactory.createForClass(Account);