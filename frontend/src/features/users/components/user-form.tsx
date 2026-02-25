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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";
import { ErrorDisplay } from "@/components/common/error-display";


interface UserFormProps {
    initialData?: User | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function UserForm({ initialData, onSubmit, isLoading }: UserFormProps) {
    const profileFormSchema = z
        .object({
            photo: z.any().optional(),
            firstName: z.string().min(1, "First name is required"),
            lastName: z.string().min(1, "Last name is required"),
            email: z.string().email("Invalid email address").min(1, "Email is required"),
            phoneNumber: z.string().nullable().optional(),
            processusId: z.string().optional().nullable(),
            role: z.enum(
                [
                    RoleEnum.ADMINISTRATOR,
                    RoleEnum.PRESIDENT,
                    RoleEnum.MEMBER,
                    RoleEnum.ALUMNI,
                ],
                { required_error: "Role is required" }
            ),
            workplace: z.string().nullable().optional(),
            mandate: z.string().nullable().optional(),

            password: z.string().optional(),
            confirmPassword: z.string().optional(),
        })
        .superRefine((data, ctx) => {
            if (!data.password && !initialData) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password is required",
                    path: ["password"],
                });
            }

            if (data.password && data.password.length < 6) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must be at least 6 characters",
                    path: ["password"],
                });
            }

            if (data.password && data.password !== data.confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Passwords do not match",
                    path: ["confirmPassword"],
                });
            }
        });

    type ProfileFormValues = z.infer<typeof profileFormSchema>;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewApi, setPreviewApi] = useState<string | null>(null);

    const { data: processus, isPending: isPendingProcessus, isError: isErrorProcessus, error: errorProcessus } =
        useGetProcessus();

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            photo: initialData?.photo || null,
            firstName: initialData?.firstName || "",
            lastName: initialData?.lastName || "",
            email: initialData?.email || "",
            phoneNumber: initialData?.phoneNumber || "",
            processusId: initialData?.processus?.id || null,
            role: initialData?.role?.id || RoleEnum.MEMBER,
            workplace: initialData?.workplace || "",
            mandate: initialData?.mandate || "",
            password: "",
            confirmPassword: "",
        },
    });

    // Reset form when initialData changes
    useEffect(() => {
        if (initialData) {
            profileForm.reset({
                photo: initialData.photo || null,
                firstName: initialData.firstName || "",
                lastName: initialData.lastName || "",
                email: initialData?.email || "",
                phoneNumber: initialData?.phoneNumber || "",
                processusId: initialData.processus?.id || null,
                role: initialData.role?.id || RoleEnum.MEMBER,
                workplace: initialData.workplace || "",
                mandate: initialData.mandate || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [initialData, profileForm]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            profileForm.setValue("photo", file);
            if (previewApi && previewApi.startsWith("blob:")) {
                URL.revokeObjectURL(previewApi);
            }
            const objectUrl = URL.createObjectURL(file);
            setPreviewApi(objectUrl);
        }
    };

    const handleSubmit = (values: ProfileFormValues) => {
        const apiData: Partial<CreateUserRequest> = {
            photo: values.photo,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber || null,
            processus:
                values.processusId && values.processusId.length > 0
                    ? { id: values.processusId }
                    : null,
            role: {
                id: values.role,
                name:
                    values.role.charAt(0).toUpperCase() +
                    values.role.slice(1),
            },
            workplace:
                values.role === RoleEnum.ALUMNI
                    ? values.workplace
                    : null,
            mandate:
                values.role === RoleEnum.ALUMNI
                    ? values.mandate
                    : null,
        };

        if (values.password) {
            apiData.password = values.password;
        }

        onSubmit(apiData);
    };

    // Check if role is ALUMNI
    const isAlumni = profileForm.watch("role") === RoleEnum.ALUMNI;

    return (
        <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Photo Upload */}
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
                                <UploadCloud className="mr-2 h-4 w-4" /> Upload New Photo
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
                    {/* First Name */}
                    <FormField control={profileForm.control} name="firstName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {/* Last Name */}
                    <FormField control={profileForm.control} name="lastName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={profileForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="+216 12 345 678" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={profileForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={initialData ? "Leave blank to keep current password" : "Enter password"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={profileForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Processus select */}
                    {!isPendingProcessus && !isErrorProcessus && (
                        <FormField control={profileForm.control} name="processusId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Processus</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a processus" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {processus?.data?.map((p) => (
                                            <SelectItem key={p.id} value={p.id?.toString()}>
                                                {p.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    )}

                    {/* Role */}
                    <FormField control={profileForm.control} name="role" render={({ field }) => (
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
                    )} />

                    {/* Workplace (editable only for ALUMNI) */}
                    {isAlumni && (
                        <FormField control={profileForm.control} name="workplace" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Workplace</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter workplace"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    )}

                    {/* Mandate (editable only for ALUMNI) */}
                    {isAlumni && (
                        <FormField control={profileForm.control} name="mandate" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mandate</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter mandate"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    )}



                    {isPendingProcessus && (
                        <div className="flex items-center justify-center col-span-2">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading processus...
                        </div>
                    )}
                    {isErrorProcessus && (
                        <div className="flex items-center justify-center col-span-2">
                            <ErrorDisplay title="Failed to load processus." error={errorProcessus} />
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Profile
                    </Button>
                </div>
            </form>
        </Form>
    );
}
