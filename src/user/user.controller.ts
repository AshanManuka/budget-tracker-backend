import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user';
import { User } from 'src/schemas/user.schema';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}


    @Post('create')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

}
