"use client";

import { useState, useMemo } from "react";
import { Brain, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { BaseDialog } from "@/components/common/form-dialog";
import { Protect } from "@/features/auth/components/protect";

import { User } from "@/features/users/types/users.types";
import { RoleEnum } from "@/features/users/types/roles.types";
import { useGetSkills } from "@/features/skills/hooks/use-get-skills";
import { useUpdateUser } from "@/features/users/hooks/use-update-user";

interface AlumniSkillsProps {
    user: User;
}

export const AlumniSkills = ({ user }: AlumniSkillsProps) => {
    const updateMutation = useUpdateUser();
    
    const { 
        data: allSkills, 
        isLoading, 
        isError 
    } = useGetSkills();

    const [isAddSkillsOpen, setIsAddSkillsOpen] = useState(false);
    const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(new Set());

    const hasSkills = user.skills && user.skills.length > 0;

    const availableSkills = useMemo(() => {
        if (!allSkills) return [];
        return allSkills.data.filter(
            (skill) => !user.skills.some((s) => s.id === skill.id)
        );
    }, [allSkills, user.skills]);

    function toggleSkill(skillId: string) {
        setSelectedSkillIds((prev) => {
            const next = new Set(prev);
            next.has(skillId) ? next.delete(skillId) : next.add(skillId);
            return next;
        });
    }

    async function handleRemoveSkill(skillId: string) {
        await updateMutation.mutateAsync({
            id: user.id,
            data: {
                ...user,
                skills: user.skills.filter((s) => s.id !== skillId),
            },
        });
    }

    async function handleAddSkills() {
        const skillsToAdd = availableSkills
            .filter((skill) => selectedSkillIds.has(skill.id))
            .map((skill) => ({ id: skill.id }));

        await updateMutation.mutateAsync({
            id: user.id,
            data: {
                ...user,
                skills: [...user.skills, ...skillsToAdd],
            },
        });

        setSelectedSkillIds(new Set());
        setIsAddSkillsOpen(false);
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl font-semibold w-full">
                        Skills
                    </CardTitle>
                    <Button onClick={() => setIsAddSkillsOpen(true)}>
                        Add Skills
                    </Button>
                </CardHeader>

                <CardContent>
                    {hasSkills ? (
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill) => (
                                <Badge
                                    key={skill.id}
                                    variant="secondary"
                                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium"
                                >
                                    {skill.title}
                                    <Protect
                                        allowedRoles={[
                                            RoleEnum.ADMINISTRATOR,
                                            RoleEnum.PRESIDENT,
                                        ]}
                                    >
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => handleRemoveSkill(skill.id)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Protect>
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <Empty className="py-8">
                            <EmptyHeader>
                                <EmptyTitle>No skills listed</EmptyTitle>
                                <EmptyDescription>
                                    This alumni hasn't added any skills yet.
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    )}
                </CardContent>
            </Card>

            <BaseDialog
                open={isAddSkillsOpen}
                onOpenChange={setIsAddSkillsOpen}
                title="Add Skills"
                description={`Attribute other skills to ${user.firstName}`}
            >
                {isLoading && (
                    <p className="text-sm text-muted-foreground">
                        Loading skills...
                    </p>
                )}

                {isError && (
                    <p className="text-sm text-destructive">
                        Failed to load skills
                    </p>
                )}

                {!isLoading && !isError && availableSkills.length === 0 && (
                    <Empty>
                        <EmptyHeader>
                            <EmptyTitle>No available skills</EmptyTitle>
                            <EmptyDescription>
                                All skills are already assigned.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}

                {!isLoading && !isError && availableSkills.length > 0 && (
                    <ScrollArea className="h-64 p-4">
                        <div className="space-y-3">
                            {availableSkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex items-start gap-3"
                                >
                                    <Checkbox
                                        checked={selectedSkillIds.has(skill.id)}
                                        onCheckedChange={() =>
                                            toggleSkill(skill.id)
                                        }
                                    />
                                    <div>
                                        <p className="text-sm font-medium">
                                            {skill.title}
                                        </p>
                                        {skill.description && (
                                            <p className="text-xs text-muted-foreground">
                                                {skill.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsAddSkillsOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={
                            selectedSkillIds.size === 0 ||
                            updateMutation.isPending
                        }
                        onClick={handleAddSkills}
                    >
                        Add Selected Skills
                    </Button>
                </div>
            </BaseDialog>
        </>
    );
};
