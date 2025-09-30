import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create_task.dto';
import { GetAllTask } from './dto/get_all_task.dto';
import { dot } from 'node:test/reporters';
import { UpdateTask } from './dto/update_task.dto';
import { DeleteTask } from './dto/delete-task.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorization } from 'src/user/decorators/auth.decor';
import { Authorized } from 'src/user/decorators/authorizate.decor';
@ApiTags("Task")
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  

  @Authorization()
  @Post('create')
  createTask(@Body() dto: CreateTaskDto,@Authorized('id') id: string){
    return this.taskService.createTask(dto, id)
  }

  @Authorization()
  @Put('update')
  update(@Body() dto: UpdateTask,@Authorized('id') id: string){
    return this.taskService.updateTask(dto, id)
  }
  @Authorization()
  @Get('all')
  getAll(@Authorized('id') id: string){
    return this.taskService.getAll(id)
  }

  @Authorization()
  @Delete('delete')
  delTask(@Authorized('id') id: string,@Body() dto: DeleteTask){
    return this.taskService.deleteTask(dto, id)
  }
}
