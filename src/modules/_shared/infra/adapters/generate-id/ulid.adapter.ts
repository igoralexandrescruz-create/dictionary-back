import { Injectable } from '@nestjs/common';
import { GenerateIdPort } from 'src/modules/_shared/application/ports/generate-id.port';
import { ulid } from 'ulid';

@Injectable()
export class ULIDAdapter implements GenerateIdPort {

  execute(): string {
    return ulid();
  }


}
