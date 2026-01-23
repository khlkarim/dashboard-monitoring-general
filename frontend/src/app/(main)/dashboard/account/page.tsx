"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useUpdateUser } from "@/features/auth/hooks/use-update-user";
import {
    UpdateUserRequest,
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
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground text-lg">
                    Manage your personal information and profile appearance.
                </p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your photo and personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...profileForm}>
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">

                                    {/* Photo Upload Section */}
                                    <div className="flex items-center gap-6">
                                        <Avatar className="h-24 w-24 border">
                                            <AvatarImage src={previewApi || undefined} alt="Profile preview" className="object-cover" />
                                            <AvatarFallback>
                                                <User className="h-8 w-8 text-muted-foreground" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col gap-2">
                                            <FormLabel>Profile Photo</FormLabel>
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    <UploadCloud className="mr-2 h-4 w-4" />
                                                    Upload New Photo
                                                </Button>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Max file size: 5MB. Accepted formats: JPG, PNG.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={profileForm.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John" {...field} value={field.value || ""} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={profileForm.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Doe" {...field} value={field.value || ""} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={profileForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john.doe@example.com" type="email" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={updateUserMutation.isPending}>
                                            {updateUserMutation.isPending && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Save Profile
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <KeyRound className="h-5 w-5 text-primary" />
                                <CardTitle>Security</CardTitle>
                            </div>
                            <CardDescription>Change your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                                    <FormField
                                        control={passwordForm.control}
                                        name="oldPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={passwordForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>New Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="••••••••" {...field} value={field.value || ""} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={passwordForm.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm New Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="••••••••" {...field} value={field.value || ""} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={updateUserMutation.isPending}>
                                            {updateUserMutation.isPending && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Update Password
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-muted/50 border-none shadow-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Security Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-4 text-muted-foreground">
                            <p>• Use at least 8 characters</p>
                            <p>• Mix uppercase and lowercase letters</p>
                            <p>• Include numbers and symbols</p>
                            <p>• Don't use common words or birthdays</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default withAuth(AccountPage);
