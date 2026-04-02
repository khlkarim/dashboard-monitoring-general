import { z } from 'zod';
import { skillResponseSchema } from '../schemas/skills.schemas';

export type Skill = z.infer<typeof skillResponseSchema>;
