import { TaskEntity } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: 'varchar', length: 20, unique: true})
    username: string;
    @Column({type: 'varchar'})
    password: string;
    @Column({type: 'varchar', length: 50, unique: true})
    email: string;
    @Column({type: 'boolean', default: true})
    isActive: boolean;
    @OneToMany(() => TaskEntity, task => task.user)
    tasks: TaskEntity[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}