import {
    IsInt,
    IsAlpha,
    MaxLength,
    IsDate,
    IsDecimal, IsAlphanumeric
} from "class-validator";

export class PagosCreateDto {


    @IsAlpha()
    tipo_pago

    @IsAlphanumeric()
    numero_tarjeta

    @IsAlphanumeric()
    @MaxLength(3)
    digito_seguridad


}