import {
    IsInt,
    IsAlpha,
    Min, Max
} from "class-validator";

export class AsientoCreateDto{

    @IsInt()
    numero_asiento

    @IsAlpha()
    tipo_asiento
}