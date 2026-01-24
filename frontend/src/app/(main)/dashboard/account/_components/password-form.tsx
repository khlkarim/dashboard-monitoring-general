"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/features/auth/hooks/use-update-user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const passwordFormSchema = z.object({
    oldPassword: z.string().min(1, "Current password is required"),
    password: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function PasswordForm() {
    const updateUserMutation = useUpdateUser();

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            password: "",
            oldPassword: "",
            confirmPassword: "",
        },
    });

    const onPasswordSubmit = (data: PasswordFormValues) => {
        const { confirmPassword, ...updateData } = data;
        updateUserMutation.mutate({ data: updateData });
    };

    return (
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
    );
}