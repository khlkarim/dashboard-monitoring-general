import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Comment } from '../../../../domain/comment';
import { CommentRepository } from '../../comment.repository';
import { CommentMapper } from '../mappers/comment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Task } from 'src/tasks/domain/task';

@Injectable()
export class CommentRelationalRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(data: Comment): Promise<Comment> {
    const persistenceModel = CommentMapper.toPersistence(data);
    const newEntity = await this.commentRepository.save(
      this.commentRepository.create(persistenceModel),
    );
    return CommentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Comment[]> {
    const entities = await this.commentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CommentMapper.toDomain(entity));
  }

  async findAllByTaskIdWithPagination({
    paginationOptions,
    taskId,
  }: {
    paginationOptions: IPaginationOptions;
    taskId: Task['id'];
  }): Promise<Comment[]> {
    const entities = await this.commentRepository.find({
      where: { task: { id: taskId } },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CommentMapper.toDomain(entity));
  }

  async findById(id: Comment['id']): Promise<NullableType<Comment>> {
    const entity = await this.commentRepository.findOne({
      where: { id },
    });

    return entity ? CommentMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Comment['id'][]): Promise<Comment[]> {
    const entities = await this.commentRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CommentMapper.toDomain(entity));
  }

  async update(id: Comment['id'], payload: Partial<Comment>): Promise<Comment> {
    const entity = await this.commentRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.commentRepository.save(
      this.commentRepository.create(
        CommentMapper.toPersistence({
          ...CommentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CommentMapper.toDomain(updatedEntity);
  }

  async remove(id: Comment['id']): Promise<void> {
    await this.commentRepository.delete(id);
  }

  // Simple data queries for member statistics
  async getCommentCountByUser(userId: string): Promise<number> {
    return this.commentRepository.count({
      where: { author: { id: userId } },
    });
  }

  async getCommentCountByUserAfterDate(
    userId: string,
    startDate: Date,
  ): Promise<number> {
    return this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.authorId = :userId', { userId })
      .andWhere('comment.createdAt >= :startDate', { startDate })
      .getCount();
  }
}
