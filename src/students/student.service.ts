import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { Group, GroupDocument } from '../groups/schemas/group.schema';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { GradeStudentDto } from './dto/grade-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async create(enrollStudentDto: EnrollStudentDto): Promise<StudentDocument> {
    const studentData: any = {
      full_name: enrollStudentDto.full_name,
      email: enrollStudentDto.email,
      phone: enrollStudentDto.phone,
      course: enrollStudentDto.courseId,
      enrollment_date: new Date(),
      status: 'active',
    };

    // Only set teacher if teacherId is provided
    if (enrollStudentDto.teacherId && enrollStudentDto.teacherId.trim() !== '') {
      studentData.teacher = enrollStudentDto.teacherId;
    }

    // Only set group if groupId is provided (admin/moderator can set this)
    // Students self-enrolling should not have groupId set
    if (enrollStudentDto.groupId && enrollStudentDto.groupId.trim() !== '') {
      studentData.group = enrollStudentDto.groupId;
    }

    const student = new this.studentModel(studentData);
    const savedStudent = await student.save();

    // If groupId is provided, also add student to group's students array
    if (enrollStudentDto.groupId && enrollStudentDto.groupId.trim() !== '') {
      try {
        const group = await this.groupModel.findById(enrollStudentDto.groupId).exec();
        if (group) {
          // Check max students limit
          const currentStudentIds = group.students.map((s: any) => 
            typeof s === 'object' && s._id ? s._id.toString() : s.toString()
          );
          
          if (group.maxStudents && currentStudentIds.length >= group.maxStudents) {
            throw new BadRequestException(
              `Group is full. Maximum ${group.maxStudents} students allowed.`
            );
          }

          // Add student to group's students array if not already present
          const studentIdStr = savedStudent._id.toString();
          if (!currentStudentIds.includes(studentIdStr)) {
            group.students.push(savedStudent._id as any);
            await group.save();
          }
        }
      } catch (error) {
        // If group update fails, log but don't fail student creation
        // The student's group field is already set, admin can fix group's students array manually if needed
        if (error instanceof BadRequestException) {
          throw error; // Re-throw BadRequestException (group full)
        }
        // For other errors, continue - student is created with group field set
      }
    }

    return savedStudent;
  }

  async findAll(): Promise<StudentDocument[]> {
    return this.studentModel.find().populate('course').populate('teacher').exec();
  }

  async findOne(id: string): Promise<StudentDocument> {
    const student = await this.studentModel
      .findById(id)
      .populate('course')
      .populate('teacher')
      .exec();

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async findByTeacher(teacherId: string): Promise<StudentDocument[]> {
    return this.studentModel
      .find({ teacher: teacherId })
      .populate('course')
      .populate('teacher')
      .exec();
  }

  async findByCourse(courseId: string): Promise<StudentDocument[]> {
    return this.studentModel
      .find({ course: courseId })
      .populate('course')
      .populate('teacher')
      .populate('group')
      .exec();
  }

  async findByCourseWithPagination(
    courseId: string,
    query: {
      page?: number;
      limit?: number;
      search?: string;
      teacherId?: string;
      groupId?: string;
      status?: string;
    }
  ): Promise<{
    data: StudentDocument[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = { course: courseId };

    if (query.teacherId) {
      filter.teacher = query.teacherId;
    }

    if (query.groupId) {
      filter.group = query.groupId;
    }

    if (query.status) {
      filter.status = query.status;
    }

    // Build search filter
    if (query.search) {
      filter.$or = [
        { full_name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
        { phone: { $regex: query.search, $options: 'i' } },
      ];
    }

    // Get total count
    const total = await this.studentModel.countDocuments(filter).exec();

    // Get paginated data
    const data = await this.studentModel
      .find(filter)
      .populate('course', 'name description duration')
      .populate('teacher', 'full_name email phone')
      .populate('group', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async update(id: string, updateData: Partial<Student>): Promise<StudentDocument> {
    const student = await this.studentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('course')
      .populate('teacher')
      .exec();

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async gradeStudent(id: string, gradeStudentDto: GradeStudentDto): Promise<StudentDocument> {
    const student = await this.findOne(id);
    const studentDoc = student as StudentDocument;

    if (gradeStudentDto.grades) {
      studentDoc.grades = { ...(studentDoc.grades || {}), ...gradeStudentDto.grades };
    }

    if (gradeStudentDto.attendanceDate && gradeStudentDto.present !== undefined) {
      if (!studentDoc.attendance) {
        studentDoc.attendance = [];
      }
      studentDoc.attendance.push({
        date: new Date(gradeStudentDto.attendanceDate),
        present: gradeStudentDto.present,
      });
    }

    return studentDoc.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Student not found');
    }
  }
}

