import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';

@Injectable()
export class SeedService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokeModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async excecuteSeed() {
    await this.pokeModel.deleteMany({}); // Delete all
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=30');

    let pokemons: CreatePokemonDto[] = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemons.push({ name, no });
      return { name, no }
    });

    await this.pokeModel.insertMany(pokemons);

    return 'Seed executed';
  }
}
