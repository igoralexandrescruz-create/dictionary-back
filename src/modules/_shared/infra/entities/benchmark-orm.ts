import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LogServiceOrm } from './service-orm';

@Entity({ schema: 'log', name: 'benchmark' })
export class LogBenchmarkOrm {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'id_service' })
    idService: number;

    @Column({ name: 'duration', type: 'integer', nullable: false })
    duration: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => LogServiceOrm, (service) => service.benchmarks)
    @JoinColumn({ name: 'id_service', referencedColumnName: 'id' })
    service: LogServiceOrm;
} 