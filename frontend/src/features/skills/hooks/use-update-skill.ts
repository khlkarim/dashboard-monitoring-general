import { toast } from 'sonner';
import { skillsApi } from '../api/skills.api';
import { UpdateSkillRequest } from '../schemas/skills.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSkillRequest }) =>
      skillsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill updated successfully');
    },
    onError: () => {
      toast.error('Failed to update skill');
    },
  });
};
