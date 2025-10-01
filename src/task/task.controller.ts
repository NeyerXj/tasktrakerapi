import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create_task.dto';
import { GetAllTask } from './dto/get_all_task.dto';
import { dot } from 'node:test/reporters';
import { UpdateTask } from './dto/update_task.dto';
import { DeleteTask } from './dto/delete-task.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorization } from 'src/user/decorators/auth.decor';
import { Authorized } from 'src/user/decorators/authorizate.decor';
@ApiTags("Task")
@ApiBearerAuth('defaultBearerAuth')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  

  @Authorization()
  @Post('create')
  @ApiOperation({ summary: 'Создать задачу' })
  @ApiResponse({ status: 201, description: 'Задача создана' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: CreateTaskDto })
  createTask(@Body() dto: CreateTaskDto,@Authorized('id') id: string){
    return this.taskService.createTask(dto, id)
  }

  @Authorization()
  @Put('update')
  @ApiOperation({ summary: 'Обновить задачу текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Задача обновлена' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiBody({ type: UpdateTask })
  update(@Body() dto: UpdateTask,@Authorized('id') id: string){
    return this.taskService.updateTask(dto, id)
  }
  @Authorization()
  @Get('all')
  @ApiOperation({ summary: 'Получить все задачи текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Список задач' })
  getAll(@Authorized('id') id: string){
    return this.taskService.getAll(id)
  }

  @Authorization()
  @Delete('delete')
  @ApiOperation({ summary: 'Удалить задачу по ID' })
  @ApiResponse({ status: 200, description: 'Удалено' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiBody({ type: DeleteTask })
  delTask(@Authorized('id') id: string,@Body() dto: DeleteTask){
    return this.taskService.deleteTask(dto, id)
  }
}
