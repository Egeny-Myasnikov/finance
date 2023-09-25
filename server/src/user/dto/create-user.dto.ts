import { IsEmail, MinLength } from "class-validator";


export class CreateUserDto {
    @IsEmail()
    email: string

    @MinLength(5, { message: 'Пароль должен содержать более 5 символов' })
    password: string


}
