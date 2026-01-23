"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUserRequest, RoleEnum } from "@/features/users/schemas/users.schemas";
import { User } from "@/features/users/types/users.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
    role: z.enum([RoleEnum.ADMINISTRATOR, RoleEnum.PRESIDENT, RoleEnum.MEMBER, RoleEnum.ALUMNI], { required_error: "Role is required" }),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
    initialData?: User | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function UserForm({ initialData, onSubmit, isLoading }: UserFormProps) {
    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: initialData?.firstName || "",
            lastName: initialData?.lastName || "",
            email: initialData?.email || "",
            password: "",
            role: initialData?.role?.id || RoleEnum.MEMBER,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                firstName: initialData.firstName || "",
                lastName: initialData.lastName || "",
                email: initialData.email || "",
                password: "",
                role: initialData.role?.id || RoleEnum.MEMBER,
            });
        }
    }, [initialData, form]);

    const handleSubmit = (values: UserFormValues) => {
        const apiData: Partial<CreateUserRequest> = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: { id: values.role, name: (values.role.charAt(0).toUpperCase() + values.role.slice(1)) },
        };

        // Only include password if it's provided (important for updates to not overwrite with empty)
        if (values.password && values.password.length >= 6) {
            apiData.password = values.password;
        }

        onSubmit(apiData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john.doe@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{initialData ? "New Password (Optional)" : "Password"}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            {initialData && (
                                <FormDescription>Leave empty to keep current password.</FormDescription>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(RoleEnum).map((role) => (
                                        <SelectItem key={role} value={role} className="capitalize">
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update User" : "Create User"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
