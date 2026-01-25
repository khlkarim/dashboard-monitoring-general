"use client";

import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { CreateUserRequest } from "@/features/users/schemas/users.schemas";
import { User } from "@/features/users/types/users.types";
import { RoleEnum } from "../types/roles.types";
import { Loader2, UploadCloud, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const profileFormSchema = z.object({
    photo: z.any().optional(), // File or Blob
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    role: z.enum([RoleEnum.ADMINISTRATOR, RoleEnum.PRESIDENT, RoleEnum.MEMBER, RoleEnum.ALUMNI], { required_error: "Role is required" }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserFormProps {
    initialData?: User | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function UserForm({ initialData, onSubmit, isLoading }: UserFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewApi, setPreviewApi] = useState<string | null>(null);

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

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            photo: initialData?.photo || null,
            firstName: initialData?.firstName || "",
            lastName: initialData?.lastName || "",
            role: initialData?.role?.id || RoleEnum.MEMBER,
        },
    });

    useEffect(() => {
        if (initialData) {
            profileForm.reset({
                photo: initialData.photo || null,
                firstName: initialData.firstName || "",
                lastName: initialData.lastName || "",
                role: initialData.role?.id || RoleEnum.MEMBER,
            });
        }
    }, [initialData, profileForm]);

    const handleSubmit = (values: ProfileFormValues) => {
        const apiData: Partial<CreateUserRequest> = {
            photo: values.photo,
            firstName: values.firstName,
            lastName: values.lastName,
            role: { id: values.role, name: (values.role.charAt(0).toUpperCase() + values.role.slice(1)) },
        };

        console.log(apiData);

        onSubmit(apiData);
    };

    return (
        <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(handleSubmit)} className="space-y-6">

                {/* Photo Upload Section */}
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border">
                        <AvatarImage src={previewApi || undefined} alt="Profile preview" className="object-cover" />
                        <AvatarFallback>
                            <UserIcon className="h-8 w-8 text-muted-foreground" />
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
                    <FormField
                        control={profileForm.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={RoleEnum.ADMINISTRATOR}>Administrator</SelectItem>
                                        <SelectItem value={RoleEnum.PRESIDENT}>President</SelectItem>
                                        <SelectItem value={RoleEnum.MEMBER}>Member</SelectItem>
                                        <SelectItem value={RoleEnum.ALUMNI}>Alumni</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save Profile
                    </Button>
                </div>
            </form>
        </Form>
    );
}