import { z } from 'zod';
import { skillSchema } from '../schemas/skills.schemas';

export type Skill = z.infer<typeof skillSchema>;
