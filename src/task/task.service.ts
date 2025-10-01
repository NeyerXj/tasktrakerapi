import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create_task.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UpdateTask } from './dto/update_task.dto';
import { DeleteTask } from './dto/delete-task.dto';

@Injectable()
export class TaskService {
        constructor(
            @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>,
            private readonly userService: UserService
        ) {}

        async getAll(userId: string){

            const userExists = await this.userService.findByUUID(userId);
            if (!userExists) {
                throw new NotFoundException("User not found");
            }
            
            return this.taskRepository.find({ where: { userId } });
        }

        async getTaskById(id: string){
            const task = await this.taskRepository.findOne({where:{
                id: id
            }})
            if(!task){
                throw new NotFoundException('Task not found')
            }
            return task
        }

        async createTask(dto: CreateTaskDto, id: string): Promise<TaskEntity> {
            const { title, context, isCompleted} = dto;
            const userId = id
            
            // Проверяем существование пользователя
            const userExists = await this.userService.findByUUID(userId);
            if (!userExists) {
                throw new NotFoundException("User not found");
            }
            
            // Создаем задачу
            const task = this.taskRepository.create({
                userId,
                title,
                context,
                isCompleted
            });
            
            return await this.taskRepository.save(task);
        }

        async updateTask(dto: UpdateTask, id: string){
            const {title, context, isCompleted} = dto

            const task = await this.taskRepository.findOne({
                where: {id: id}
            })
            if(!task){
                throw new NotFoundException("Task not found")
            }

            Object.assign(task, dto)

            await this.taskRepository.save(task)

            return true
        }

        async deleteTask(dto: DeleteTask, userId: string){
            const{id} = dto

            const userExists = await this.userService.findByUUID(userId);
            if (!userExists) {
                throw new NotFoundException("User not found");
            }


            const task = await this.taskRepository.findOne({
                where: {id: id}
            })
            if(!task){
                throw new NotFoundException("Task not found")
            }
            
            const taskuser = task.userId

            if(taskuser != userId){
                console.log(`TaskuserId ${taskuser}, our user ${userId}`)
                throw new NotFoundException("Task not found in your lib")
            }

            await this.taskRepository.delete(id)
            return true
        }
}
