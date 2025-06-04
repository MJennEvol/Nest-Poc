import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapter/axios.adapter';
import { SeedModule } from 'src/seed/seed.module';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter],
})
export class CommonModule { }
