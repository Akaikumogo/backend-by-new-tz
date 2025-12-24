import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { GroupsService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { MoveStudentDto } from './dto/move-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('groups')
@Controller('groups')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'moderator')
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({ status: 201, description: 'Group created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiQuery({ name: 'courseId', required: false, description: 'Filter by course ID' })
  @ApiResponse({ status: 200, description: 'List of groups retrieved successfully' })
  findAll(@Query('courseId') courseId?: string) {
    return this.groupsService.findAll(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group by ID' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update group' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group updated successfully' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete group' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group deleted successfully' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }

  @Post(':id/students')
  @ApiOperation({ summary: 'Add students to group' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Students added to group successfully' })
  @ApiResponse({ status: 400, description: 'Group is full' })
  addStudents(@Param('id') id: string, @Body() body: { studentIds: string[] }) {
    return this.groupsService.addStudentsToGroup(id, body.studentIds);
  }

  @Delete(':id/students/:studentId')
  @ApiOperation({ summary: 'Remove student from group' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student removed from group successfully' })
  removeStudent(@Param('id') id: string, @Param('studentId') studentId: string) {
    return this.groupsService.removeStudentFromGroup(id, studentId);
  }

  @Post('move-student')
  @ApiOperation({ summary: 'Move student between groups or remove from group' })
  @ApiResponse({ status: 200, description: 'Student moved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  moveStudent(
    @Body() moveStudentDto: MoveStudentDto,
    @CurrentUser() user: any,
  ) {
    return this.groupsService.moveStudent(moveStudentDto, user._id);
  }

  @Get('course/:courseId/unassigned')
  @ApiOperation({ summary: 'Get unassigned students for a course' })
  @ApiParam({ name: 'courseId', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Unassigned students retrieved successfully' })
  getUnassignedStudents(@Param('courseId') courseId: string) {
    return this.groupsService.getUnassignedStudents(courseId);
  }

  @Get('students/:studentId/history')
  @ApiOperation({ summary: 'Get student group history' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student history retrieved successfully' })
  getStudentHistory(@Param('studentId') studentId: string) {
    return this.groupsService.getStudentHistory(studentId);
  }
}

