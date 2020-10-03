import {IsAlpha, IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";

export class CabeceraReservaCreateDto {

    @IsAlpha()
    @MinLength(3)
    @MaxLength(25)
    @IsNotEmpty()
    estadoReserva: String;

    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    @IsOptional()
    observaciones: String;
}