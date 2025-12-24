import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CoursesService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { TeacherResponseDto } from './dto/teacher-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all courses (public)' })
  @ApiResponse({ status: 200, description: 'List of courses retrieved successfully' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID (public)' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Course retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Get(':id/details')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get course details with groups and unassigned students' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Course details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  findOneWithDetails(@Param('id') id: string) {
    return this.coursesService.findOneWithDetails(id);
  }

  @Get(':id/teachers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get teachers assigned to a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of teachers retrieved successfully',
    type: [TeacherResponseDto]
  })
  @ApiResponse({ status: 400, description: 'Invalid course ID format' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  getCourseTeachers(@Param('id') id: string): Promise<TeacherResponseDto[]> {
    return this.coursesService.getCourseTeachers(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('moderator', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create course (moderator/admin)' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('moderator', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update course (moderator/admin)' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('moderator', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete course (moderator/admin)' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  @Post(':id/assign-teacher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('moderator', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign teachers to course (moderator/admin)' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiBody({ type: AssignTeacherDto })
  @ApiResponse({ status: 200, description: 'Teachers assigned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  assignTeachers(@Param('id') id: string, @Body() assignTeacherDto: AssignTeacherDto) {
    return this.coursesService.assignTeachers(id, assignTeacherDto);
  }
}

