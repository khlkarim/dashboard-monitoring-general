"use client";

import { Header } from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { SecurityTips } from "./_components/security-tips";
import { PasswordForm } from "./_components/password-form";
import { withAuth } from "@/features/auth/components/with-auth";
import { PersonalInfoForm } from "./_components/personal-info-form";

function AccountPage() {
    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <Header 
                title="Account Settings"
                description="Manage your personal information and profile appearance."
            />
            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <PersonalInfoForm />
                    <PasswordForm />
                </div>

                <SecurityTips />
            </div>
        </div>
    );
}

export default withAuth(AccountPage);
