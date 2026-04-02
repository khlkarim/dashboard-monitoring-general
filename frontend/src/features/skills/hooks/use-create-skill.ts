import { toast } from 'sonner';
import { skillsApi } from '../api/skills.api';
import { CreateSkillRequest } from '../schemas/skills.schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSkillRequest) => skillsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill created successfully');
    },
    onError: () => {
      toast.error('Failed to create Skill');
    },
  });
};
