"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { activityFormSchema, ActivityFormValues, PartialActivityFormValues } from "../schemas/activities.schemas";
import { DatePicker } from "@/components/ui/date-picker";

interface ActivityFormProps {
    initialData?: ActivityFormValues | null;
    onSubmit: (data: PartialActivityFormValues) => void;
    isLoading?: boolean;
}

export function ActivityForm({ initialData, onSubmit, isLoading }: ActivityFormProps) {
    const form = useForm<PartialActivityFormValues>({
        resolver: zodResolver(activityFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            startDate: initialData?.startDate || "",
            endDate: initialData?.endDate || "",
        },
    });

    const handleSubmit = (values: PartialActivityFormValues) => {
        onSubmit(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="activity title" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="activity description" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    placeholder="activity start date"
                                    {...field}
                                    setDate={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="endDate"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    placeholder="activity end date"
                                    {...field}
                                    setDate={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update activity" : "Create activity"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
