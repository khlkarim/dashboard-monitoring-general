import { toast } from 'sonner';
import { skillsApi } from '../api/skills.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => skillsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete skill');
    },
  });
};
