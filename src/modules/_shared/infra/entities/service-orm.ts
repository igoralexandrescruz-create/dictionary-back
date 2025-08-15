import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LogBenchmarkOrm } from './benchmark-orm';

@Entity({ schema: 'log', name: 'service' })
export class LogServiceOrm {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'service', type: 'varchar', length: 255, nullable: false })
    service: string;

    @OneToMany(() => LogBenchmarkOrm, (benchmark) => benchmark.service)
    benchmarks: LogBenchmarkOrm[];
} 