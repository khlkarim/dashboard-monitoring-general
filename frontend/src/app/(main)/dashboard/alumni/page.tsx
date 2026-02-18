"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { AlumniTable } from "./_components/alumni-table";
import { SkillTable } from "./_components/skills-table";
import { LoadingPage } from "@/components/common/loading-page";
import { withAuth } from "@/features/auth/components/with-auth";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetAlumni } from "@/features/users/hooks/use-get-alumni";
import { useGetSkills } from "@/features/skills/hooks/use-get-skills";

function AlumniPage() {
    const {
        data: alumni,
        isPending,
        isError,
        error
    } = useGetAlumni();

    const {
        data: skills,
        isPending: isPendingSkills,
        isError: isErrorSkills,
        error: errorSkills
    } = useGetSkills();


    if (isError || isErrorSkills) {
        return (
            <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                <ErrorDisplay
                    title="Failed to load alumni data."
                    error={isError ? error : errorSkills}
                />
            </div>
        );
    }

    if (isPending || isPendingSkills) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <Header
                title="Alumni Network"
                description="Manage former members and track their professional progress."
            />
            <Separator />
            <AlumniTable users={alumni.data} />
            <SkillTable skills={skills.data} />
        </div>
    );
}

export default withAuth(AlumniPage);
