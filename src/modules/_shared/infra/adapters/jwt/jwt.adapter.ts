import { env } from 'src/config/env';
import { JwtPort } from 'src/modules/_shared/application/ports/jwt.port';
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements JwtPort {
  private static instance: JwtAdapter;
  private jwtService: NestJwtService;

  public static getInstance(): JwtAdapter {
    if (!this.instance) {
      this.instance = new JwtAdapter();
    }
    return this.instance;
  }

  private constructor() {
    // Inicializa o JwtService do NestJS
    this.jwtService = new NestJwtService({
      secret: env.security.jwt.jwtSecret,
    });
  }

  sign<T>(payload: T, expiresIn: number): string {
    return this.jwtService.sign(payload as object, { expiresIn: `${expiresIn}m` });
  }

  verify<T>(token: string): Promise<T | null> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

} 