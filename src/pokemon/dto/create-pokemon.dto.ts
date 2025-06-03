import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreatePokemonDto {

    @IsNumber()
    @IsPositive()
    @Min(1)
    no: number;

    @IsString()
    name: string;
}
