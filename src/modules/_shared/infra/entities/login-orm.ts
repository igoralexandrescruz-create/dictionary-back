import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersOrm } from 'src/modules/users/infra/entities';

@Entity({ schema: 'log', name: 'login' })
export class LogLoginOrm {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'id_user' })
    idUser: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => UsersOrm)
    @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
    user: UsersOrm;
} 