import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'entries', name: 'history' })
export class HistoryOrm {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'integer', name: 'id_entry' })
    idEntry: number;

    @Column({ type: 'integer', name: 'id_user' })
    idUser: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
