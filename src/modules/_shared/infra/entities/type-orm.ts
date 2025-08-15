import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { LogGenericOrm } from './generic-orm';

@Entity({ schema: 'log', name: 'type' })
export class LogTypeOrm {
    @PrimaryColumn({ name: 'id', type: 'smallint' })
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
    name: string;

    @OneToMany(() => LogGenericOrm, (generic) => generic.type)
    generics: LogGenericOrm[];
}

