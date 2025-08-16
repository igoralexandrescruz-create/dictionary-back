import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'entries', name: 'entries' })
export class EntryOrm {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 255, name: 'word' })
    word: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
