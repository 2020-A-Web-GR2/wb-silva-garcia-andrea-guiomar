import {
    IsInt,
    IsAlpha,
    MaxLength,
    IsDate,
    IsDecimal, IsOptional,

} from "class-validator";


export class VueloCreateDto {
    @IsOptional()
    @IsInt()

    asientos_diponibles
    @IsOptional()
    @IsInt()

    asientos_ocupados
    @IsAlpha()
    lugar_destino
    @IsOptional()
    @IsAlpha()

    estado_vuelo
    @IsOptional()
    @IsAlpha()

    tipo_vuelo
    @IsAlpha()
    lugar_origen
}