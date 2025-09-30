import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";

@Entity("tasks")
export class TaskEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: 'varchar', length: 100})
    title: string;
    @Column({type: 'text'})
    context: string;
    @Column({type: 'boolean', default: false})
    isCompleted: boolean;
    @ManyToOne(() => UserEntity, user => user.tasks, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    user: UserEntity;
    @Column({type: 'uuid'})
    userId: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}