import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'users', name: 'users' })
export class UsersOrm {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'char', length: 26, name: 'id_public', unique: true })
    idPublic: string;

    @Column({ type: 'varchar', length: 255, name: 'name' })
    name: string;

    @Column({ type: 'varchar', length: 255, name: 'email', unique: true })
    email: string;

    @Column({ type: 'char', length: 60, name: 'password' })
    password: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
    deletedAt: Date | null;
}


