import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateTag } from './dto/create-tag.dto';
import { TaskService } from 'src/task/task.service';
import { NotFoundError } from 'rxjs';
import { PinTag } from './dto/pin-tag.dto';

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>,
    private readonly taskService:TaskService){
    }

    async create(userId:string,dto: CreateTag){
        const {taskId, tagname} = dto;
        if(!userId){
            throw new NotFoundException('User is existing')
        }
        const existingTagName = await this.tagRepository.findOne({where:{
            tagname,userOwnerId: userId
        }})
        if(existingTagName){
            throw new ConflictException('Task with this title already exists')
        }
        
        if(taskId){
           const task = await this.taskService.getTaskById(taskId)
           if(task.userId != userId){
            throw new NotFoundException('Task not found')
           }
           const tag = await this.tagRepository.create({
            tagname,
            userOwnerId: userId,
            taskId: task.id
           })
           return await this.tagRepository.save(tag) 
        }else{
            const tag = await this.tagRepository.create({tagname,userOwnerId: userId})
            return await this.tagRepository.save(tag)
        }
    }

    async pinTask(userId: string,dto: PinTag){
        const {tagId, taskId} = dto
        const tag = await this.tagRepository.findOne({where:{
            userOwnerId: userId,
            id: tagId
        }})
        const task = await this.taskService.getTaskById(taskId)
        if(!tag){
            throw new NotFoundException('Tag not found')
        }
        if (!task || task.userId !== userId) throw new NotFoundException('Task not found');

        if (tag.taskId === task.id) return tag;
        const duplicate = await this.tagRepository.findOne({where: { 
        userOwnerId: userId,
        taskId: task.id,
        tagname: tag.tagname 
        },});
        if (duplicate) {
            throw new ConflictException('Tag with this name already attached to the task');
        }
        tag.taskId = task.id;
        const updated = await this.tagRepository.save(tag); // сохранит и вернёт обновлённую сущность
        return updated;
    }
}
