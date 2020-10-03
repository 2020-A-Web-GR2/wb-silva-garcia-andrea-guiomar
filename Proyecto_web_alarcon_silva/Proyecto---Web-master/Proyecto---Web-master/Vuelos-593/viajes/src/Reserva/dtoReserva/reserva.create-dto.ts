import {IsAlpha, IsDate, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class ReservaCreateDto {

    @IsDate()
    fechaReserva: Date;

    @IsAlpha()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    tipo: String;



}