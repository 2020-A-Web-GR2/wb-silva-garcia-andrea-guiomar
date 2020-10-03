import {IsAlpha, IsAlphanumeric, IsEmail, IsInt, IsNotEmpty, IsPositive, MaxLength, MinLength} from "class-validator";


export class UsuarioCreateDto{

    @IsAlpha()
    @MinLength(3)
    @MaxLength(25)
    @IsNotEmpty()
    nombreUsuario: String;

    @IsAlpha()
    @MinLength(3)
    @MaxLength(25)
    @IsNotEmpty()
    apellidoUsuario: String;

    @IsEmail()
    @IsNotEmpty()
    correoUsuario: String;

    @IsInt()
    @IsPositive()
    edad: number;

    @IsAlphanumeric()
    @IsNotEmpty()
    contrasenia: String

}