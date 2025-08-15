import { Module } from '@nestjs/common';
import { DictDatasourceModule } from './dict-datasource';

@Module({
  imports: [DictDatasourceModule],
  controllers: [],
  providers: [],
})
export class DictDatasourcesModule { }
