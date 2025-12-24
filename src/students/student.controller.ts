import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { StudentsService } from './student.service';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { GradeStudentDto } from './dto/grade-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('students')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles('admin', 'moderator', 'teacher', 'student')
  @ApiOperation({ summary: 'Enroll a student' })
  @ApiBody({ type: EnrollStudentDto })
  @ApiResponse({ status: 201, description: 'Student enrolled successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  create(@Body() enrollStudentDto: EnrollStudentDto, @CurrentUser() user: any) {
    // If student is enrolling themselves, use their user info
    if (user.role === 'student') {
      enrollStudentDto.full_name = user.full_name || enrollStudentDto.full_name;
      enrollStudentDto.email = user.email || enrollStudentDto.email;
      enrollStudentDto.phone = user.phone || enrollStudentDto.phone;
    }
    return this.studentsService.create(enrollStudentDto);
  }

  @Get()
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Get all students (admin/moderator)' })
  @ApiResponse({ status: 200, description: 'List of students retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('teacher/:teacherId')
  @Roles('admin', 'moderator', 'teacher')
  @ApiOperation({ summary: 'Get students by teacher' })
  @ApiParam({ name: 'teacherId', description: 'Teacher ID' })
  @ApiResponse({ status: 200, description: 'List of students retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Cannot access other teachers students' })
  findByTeacher(@Param('teacherId') teacherId: string, @CurrentUser() user: any) {
    // Check if teacher is accessing their own students
    if (user.role === 'teacher' && user._id.toString() !== teacherId) {
      throw new Error('Unauthorized');
    }
    return this.studentsService.findByTeacher(teacherId);
  }

  @Get('course/:courseId')
  @Roles('admin', 'moderator', 'teacher')
  @ApiOperation({ summary: 'Get students by course with pagination, search and filters' })
  @ApiParam({ name: 'courseId', description: 'Course ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by name, email, or phone' })
  @ApiQuery({ name: 'teacherId', required: false, type: String, description: 'Filter by teacher ID' })
  @ApiQuery({ name: 'groupId', required: false, type: String, description: 'Filter by group ID' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by status (active, completed, dropped)' })
  @ApiResponse({ status: 200, description: 'List of students retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  findByCourse(
    @Param('courseId') courseId: string,
    @Query() query: QueryStudentsDto,
  ) {
    // If pagination params are provided, use paginated endpoint
    if (query.page || query.limit || query.search || query.teacherId || query.groupId || query.status) {
      return this.studentsService.findByCourseWithPagination(courseId, query);
    }
    // Otherwise return all students (backward compatibility)
    return this.studentsService.findByCourse(courseId);
  }

  @Get(':id')
  @Roles('admin', 'moderator', 'teacher')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'moderator', 'teacher')
  @ApiOperation({ summary: 'Update student' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.studentsService.update(id, updateData);
  }

  @Post(':id/grade')
  @Roles('teacher', 'admin', 'moderator')
  @ApiOperation({ summary: 'Grade a student' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiBody({ type: GradeStudentDto })
  @ApiResponse({ status: 200, description: 'Student graded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  gradeStudent(@Param('id') id: string, @Body() gradeStudentDto: GradeStudentDto) {
    return this.studentsService.gradeStudent(id, gradeStudentDto);
  }

  @Delete(':id')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Delete student' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}

