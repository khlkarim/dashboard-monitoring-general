"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useUpdateUser } from "@/features/auth/hooks/use-update-user";
import {
    updateUserRequestSchema,
} from "@/features/auth/schemas/auth.schemas";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2, UploadCloud, User, KeyRound } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Header } from "@/components/common/header";
import { SecurityTips } from "./_components/security-tips";
import { PersonalInfoForm } from "./_components/personal-info-form";
import { PasswordForm } from "./_components/password-form";

const profileFormSchema = updateUserRequestSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    photo: true,
});

const passwordFormSchema = z.object({
    oldPassword: z.string().min(1, "Current password is required"),
    password: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

function AccountPage() {
    const user = useAuthStore((state) => state.user);
    const updateUserMutation = useUpdateUser();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewApi, setPreviewApi] = useState<string | null>(null);

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            email: user?.email ?? "",
        },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            password: "",
            oldPassword: "",
            confirmPassword: "",
        },
    });

    // Reset forms when user data is loaded
    useEffect(() => {
        if (user) {
            profileForm.reset({
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
                email: user.email ?? "",
            });
            if (user.photo?.path) {
                setPreviewApi(user.photo.path);
            }
        }
    }, [user, profileForm]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            profileForm.setValue("photo", file);

            if (previewApi && previewApi.startsWith('blob:')) {
                URL.revokeObjectURL(previewApi);
            }

            const objectUrl = URL.createObjectURL(file);
            setPreviewApi(objectUrl);
        }
    };

    const onProfileSubmit = (data: ProfileFormValues) => {
        updateUserMutation.mutate({ data });
    };

    const onPasswordSubmit = (data: PasswordFormValues) => {
        const { confirmPassword, ...updateData } = data;
        updateUserMutation.mutate({ data: updateData });
    };

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
