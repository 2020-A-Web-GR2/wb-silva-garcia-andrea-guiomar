import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class RolCreateDto {

    @IsAlpha()
    @MinLength(3)
    @MaxLength(25)
    @IsNotEmpty()
    tipoRol: String;

}