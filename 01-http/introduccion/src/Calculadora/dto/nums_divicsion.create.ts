import {IsInt, IsNotEmpty, IsNumber, IsPositive, NotEquals} from "class-validator";

export class Nums_divicsionCreate {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @IsInt()
    numerouno:number

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @IsInt()
    @NotEquals(0)
    numerodos:number
}