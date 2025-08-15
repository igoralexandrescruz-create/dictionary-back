import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LogTypeOrm } from './type-orm';

@Entity({ schema: 'log', name: 'generic' })
export class LogGenericOrm {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'message', type: 'text', nullable: false })
    message: string;

    @Column({ name: 'id_type', type: 'smallint', default: 1 })
    idType: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
    createdAt: Date;

    @ManyToOne(() => LogTypeOrm, (type) => type.generics)
    @JoinColumn({ name: 'id_type', referencedColumnName: 'id' })
    type: LogTypeOrm;
} 