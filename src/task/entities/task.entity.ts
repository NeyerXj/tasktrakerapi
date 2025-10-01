// src/task/entities/task.entity.ts
import { TagEntity } from "src/tag/entities/tag.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "text" })
  context: string;

  @Column({ type: "boolean", default: false })
  isCompleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ type: "uuid" })
  userId: string;

  @OneToMany(() => TagEntity, (tag) => tag.task, {
    cascade: false,
    eager: true,   // можно включить eager, если хочешь всегда получать теги вместе с задачей
  })
  tags: TagEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}