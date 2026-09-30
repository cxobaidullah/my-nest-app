import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Student {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    age: number;
    @Prop()
    email?: string;
}

export type StudentDocument = HydratedDocument<Student>;

export const StudentSchema = SchemaFactory.createForClass(Student);