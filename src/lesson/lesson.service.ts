import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto, UpdateLessonDto } from './dto';
import { Lesson } from '../shared/models/lesson.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class LessonService {
 constructor(@InjectModel(Lesson) private _lessonModel: typeof Lesson) { }

  public async create(createLessonDto: CreateLessonDto) {
    try {
      const lesson = await this._lessonModel.create(createLessonDto);
      const response = {
        message: 'Lesson created successfully',
        data: lesson,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findAllLessons() {
    try {
      const lessons = await this._lessonModel.findAll();
      const response = {
        message: lessons ? 'List of lessons fetched successfully.' : 'Lesson not found',
        data: {
          lessons,
        }
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findLessonById(LessonId: number) {
    try {
      const lesson = await this._lessonModel.findByPk(LessonId);
      return {
        message: lesson ? 'Lesson fetched successfully.' : 'Lesson not found',
        data: lesson,
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateLessonById(LessonId: number, updateLessonDto: UpdateLessonDto) {
    try {
      const lesson = await this._lessonModel.findByPk(LessonId); // Use lessonId here
      if (!lesson || !lesson.IsActive) {
        throw new NotFoundException('Lesson not found by lesson Id');
      }
      await lesson.update(updateLessonDto);
      return {
        message: 'Lesson updated successfully.',
        data: lesson,
      };
    } catch (error) {
      throw error;
    }
  }

  public async deleteLessonById(LessonId: number) {
    try {
      // const lesson = await this._lessonModel.findByPk(LessonId);
      const lesson = await this._lessonModel.findOne({ where: { LessonId } });
      if (!lesson || !lesson.IsActive) {
        throw new NotFoundException('Lesson not found by lesson Id');
      }
      lesson.update({ IsActive: false });
      const response = {
        message: 'Lesson deleted successfully.',
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
