// src/tag/entities/tag.entity.ts
import { TaskEntity } from "src/task/entities/task.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from "typeorm";

@Entity("tags")
@Unique("UQ_task_tagname", ["taskId", "tagname"]) // убери, если дубли допустимы
export class TagEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ type: "uuid", name: "taskId", nullable: true })
  taskId: string | null;

  @ManyToOne(() => TaskEntity, (task) => task.tags, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "taskId", referencedColumnName: "id" })
  task: TaskEntity;
  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  @Column({type: 'uuid', name: 'user_owner_id'})
  userOwnerId: string

  @Column({ name: "tag_name", type: "varchar", length: 64 })
  tagname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}