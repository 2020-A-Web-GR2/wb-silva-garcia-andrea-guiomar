import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class RolUsuarioCreateDto {

    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    detalle : String;
}