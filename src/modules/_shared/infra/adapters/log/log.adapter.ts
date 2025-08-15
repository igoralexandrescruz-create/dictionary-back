import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogGenericOrm, LogTypeOrm } from '../../entities';
import { Repository } from 'typeorm';
import { LogPort } from 'src/modules/_shared/application/ports/log-port';
import { Log } from 'src/modules/_shared/application/contracts/log.contract';

@Injectable()
export class LogAdapter extends ConsoleLogger implements LogPort {
  constructor(
    @InjectRepository(LogGenericOrm)
    private readonly logRepository: Repository<LogGenericOrm>,
  ) {
    super();
  }

  async error(message: any, stack?: string, context?: string) {
    await this.saveLog({
      message,
      type: Log.Types.ERROR,
      stack,
      context,
    });
  }

  async fatal(message: any, context?: string) {
    await this.saveLog({
      message,
      type: Log.Types.FATAL,
      context,
    });
  }

  async log(message: any, context?: string) {
    await this.saveLog({
      message,
      type: Log.Types.INFO,
      stack: '',
      context,
    });
  }

  private async saveLog({
    message,
    type,
    context,
    stack,
  }: LogService.Log): Promise<void> {
    const log = this.generateLogEntity({ message, type, context, stack });
    await this.logRepository.save(log);
  }

  private generateLogEntity({ message, type, context }: LogService.Log): LogGenericOrm {
    const log = new LogGenericOrm();
    log.message = message;
    log.idType = type;
    if (context) log.message = `[${context}]: ${message}`;
    return log;
  }
}

export namespace LogService {
  export type Log = {
    message: string;
    type: Log.Types;
    stack?: string;
    context?: string;
  };
}
