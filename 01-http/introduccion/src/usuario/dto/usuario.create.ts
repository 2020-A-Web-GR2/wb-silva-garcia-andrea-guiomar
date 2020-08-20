import {
    IsAlpha,
    IsDate,
    MaxLength,
    MinLength
} from "class-validator";

export class UsuarioCreate {
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre:string

    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    apelido:string

    @IsAlpha()
    @MinLength(10)
    cedula:string

    @IsDate()
    fechaNacimiento:Date


}