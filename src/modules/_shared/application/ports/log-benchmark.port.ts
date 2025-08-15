export interface LogBenchmarkPort {
    handleBenchmark(start: number, logContext: string): Promise<void>;
}
