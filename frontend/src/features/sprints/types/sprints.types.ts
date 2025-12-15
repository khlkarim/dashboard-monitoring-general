import type { SprintResponse } from '../schemas/sprints.schemas';

export type Sprint = SprintResponse;

export type SprintStatus = number; // Could be an enum if we knew the values, keeping as number for now.
