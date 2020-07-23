// @IsAlpha()
// @IsNotEmpty()
// @MinLength()
// @MaxLength()
// @IsBoolean()
// @IsEmpty()
// @IsInt()
// @IsPositive()
// @IsOptional()
// @IsNumber()
//variable opcional con ?
import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class MascotaCreateDto{

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    nombre:string;
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @IsInt()
    edad:number; //enteros
    @IsBoolean()
    @IsNotEmpty()
    casada:boolean;
    @IsBoolean()
    @IsOptional()
    ligada?:boolean;
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    peso:number //decimales
};