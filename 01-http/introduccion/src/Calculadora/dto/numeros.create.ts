import {IsInt, IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class NumerosCreateDto {
   @IsNumber()
   @IsPositive()
   @IsNotEmpty()
   @IsInt()
   numerouno:number
   @IsNumber()
   @IsPositive()
   @IsNotEmpty()
   @IsInt()
   numerodos:number
}