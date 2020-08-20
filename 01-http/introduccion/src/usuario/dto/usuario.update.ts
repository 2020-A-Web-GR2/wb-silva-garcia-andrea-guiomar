import {IsAlpha, MaxLength, MinLength} from "class-validator";


export class UsuarioUpdate {
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre:string

    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    apelido:string
}