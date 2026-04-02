"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/ui/date-picker";
import {
    SprintStatus,
    SprintFormValues,
    sprintFormSchema,
    SprintResponse,
} from "@/features/sprints/schemas/sprints.schemas";
import { Sprint } from "../types/sprints.types";

interface SprintFormProps {
    initialData?: Sprint | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function SprintForm({ initialData, onSubmit, isLoading }: SprintFormProps) {
    const user = useAuthStore((state) => state.user);

    const form = useForm<SprintFormValues>({
        resolver: zodResolver(sprintFormSchema),
        defaultValues: {
            name: initialData?.name || "",
            goal: initialData?.goal || "",
            startDate: initialData?.startDate ? new Date(initialData.startDate) : undefined,
            endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
            validationDate: initialData?.validationDate ? new Date(initialData.validationDate) : undefined,
            status: initialData?.status || SprintStatus.PLANNED,
        },
    });

    const handleSubmit = (values: SprintFormValues) => {
        // Transform form values to API expected format
        const apiData = {
            ...values,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
            validationDate: values.validationDate?.toISOString(),
            status: values.status,
            createdBy: {
                id: user?.id,
            },
        };

        onSubmit(apiData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Sprint 1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Goal</FormLabel>
                            <FormControl>
                                <Input placeholder="Sprint goal..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        date={field.value}
                                        setDate={field.onChange}
                                        placeholder="Pick start date"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        date={field.value}
                                        setDate={field.onChange}
                                        placeholder="Pick end date"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="validationDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Validation Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                    placeholder="Pick validation date"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(SprintStatus).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            {value.charAt(0).toUpperCase() + value.toLowerCase().slice(1)}
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
                        {isLoading ? "Saving..." : initialData ? "Update Sprint" : "Create Sprint"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
