export abstract class LogPort {
    abstract error(message: any, stack?: string, context?: string): Promise<void>;
    abstract fatal(message: any, context?: string): Promise<void>;
    abstract log(message: any, context?: string): Promise<void>;
}
