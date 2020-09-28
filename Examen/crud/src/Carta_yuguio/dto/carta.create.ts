import {IsInt, IsPositive, IsString} from "class-validator";

export class CartaCreateDto {
    @IsString()
    nombreMostruo:string;
    @IsString()
    tipoMonstruo:string;
    @IsString()
    efecto:string
    @IsString()
    atributo:string
    @IsInt()
    @IsPositive()
    rango:number
    @IsString()
    ataqueDefensa:string
    
}