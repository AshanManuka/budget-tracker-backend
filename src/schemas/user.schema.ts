import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{

    @Prop({required: true, unique: true})
    email: String;

    @Prop({required: true})
    name: String;

    @Prop({required: true})
    password: String;

    @Prop()
    description: String;

}

export const UserSchema = SchemaFactory.createForClass(User);