import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CreditIssueDocument = CreditIssue & Document;

@Schema()
export class CreditIssue {
    @Prop()
    creditAmount: number;

    @Prop()
    toName: string;

    @Prop()
    issueDate: Date;

    @Prop()
    status: string;

}

export const CreditIssueSchema = SchemaFactory.createForClass(CreditIssue);