import { ApiProperty } from '@nestjs/swagger';

export class TaskStatusDistribution {
  @ApiProperty()
  TODO: number;

  @ApiProperty()
  IN_PROGRESS: number;

  @ApiProperty()
  DONE: number;
}

export class MemberStatisticsDto {
  @ApiProperty({ description: 'Total number of tasks assigned to the member' })
  totalTasks: number;

  @ApiProperty({ description: 'Distribution of tasks by status', type: TaskStatusDistribution })
  taskStatusDistribution: TaskStatusDistribution;

  @ApiProperty({ description: 'Number of overdue tasks' })
  overdueTasks: number;

  @ApiProperty({ description: 'Completion rate as a percentage (0-100)' })
  completionRate: number;

  @ApiProperty({ description: 'User engagement score (0-100)' })
  engagementScore: number;

  @ApiProperty({ description: 'Average days to complete a task' })
  averageCompletionTime: number;

  @ApiProperty({ description: 'Number of tasks completed this month' })
  completedThisMonth: number;

  @ApiProperty({ description: 'On-time completion rate as a percentage' })
  onTimeRate: number;
}
