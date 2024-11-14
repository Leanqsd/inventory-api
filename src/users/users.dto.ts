import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UserDto {
    id:number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;
}