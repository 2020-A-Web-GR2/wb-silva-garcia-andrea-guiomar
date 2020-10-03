import {
    IsInt,
    IsAlpha,
    Min, Max,
    IsDate,
    IsDecimal
} from "class-validator";

export class EscalasCreateDto {
    @IsAlpha()
    lugar_escala
    @IsInt()
    tiempo_escala
}