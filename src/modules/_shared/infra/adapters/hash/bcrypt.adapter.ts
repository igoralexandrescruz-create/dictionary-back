import { HashPort } from 'src/modules/_shared/application/ports/hash.port';
import { Injectable } from '@nestjs/common';
import { hash as bcryptHash, compare as bcryptCompare } from 'bcrypt';
import { env } from 'src/config/env';

@Injectable()
export class BcryptPort implements HashPort {
  private static instance: BcryptPort;

  public static getInstance(): BcryptPort {
    if (!this.instance) {
      this.instance = new BcryptPort();
    }
    return this.instance;
  }

  private constructor() { }

  async hash(plainText: string): Promise<string> {
    const rounds = env.security.hash.rounds || 10;
    const hash = await bcryptHash(plainText, rounds);
    return hash;
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    const isValid = await bcryptCompare(plainText, hash);
    return isValid;
  }

} 