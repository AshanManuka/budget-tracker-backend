import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/schemas/user.schema";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
