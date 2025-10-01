import { Body, Controller, Post, Put } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTag } from './dto/create-tag.dto';
import { Authorization } from 'src/user/decorators/auth.decor';
import { Authorized } from 'src/user/decorators/authorizate.decor';
import { PinTag } from './dto/pin-tag.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@ApiBearerAuth('defaultBearerAuth')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Authorization()
  @Post('create')
  @ApiOperation({ summary: 'Создать тег' })
  @ApiResponse({ status: 201, description: 'Тег создан' })
  @ApiResponse({ status: 404, description: 'Task not found | User is existing' })
  @ApiBody({ type: CreateTag })
  async create(@Authorized('id') id: string,@Body() dto: CreateTag){
    return await this.tagService.create(id,dto)
  }
  @Authorization()
  @Put('pin')
  @ApiOperation({ summary: 'Привязать существующий тег к задаче' })
  @ApiResponse({ status: 200, description: 'Тег привязан' })
  @ApiResponse({ status: 404, description: 'Tag not found | Task not found' })
  @ApiBody({ type: PinTag })
  async pinTask(@Authorized('id') id: string,@Body() dto: PinTag){
    return await this.tagService.pinTask(id, dto)
  }
}
