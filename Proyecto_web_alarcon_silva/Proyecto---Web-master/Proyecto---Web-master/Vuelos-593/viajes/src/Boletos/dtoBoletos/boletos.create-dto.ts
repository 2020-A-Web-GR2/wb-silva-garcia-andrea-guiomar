import {
    IsInt,
    IsAlpha,
    Min, Max,
    IsDate,
    IsDecimal, IsAlphanumeric, IsDateString, IsRFC3339
} from "class-validator";


export class BoletosCreateDto {

    @IsDate()
    fecha_salida

    @IsDecimal()
    costo_boleto

    @IsAlphanumeric()
    puerta_abordaje
}