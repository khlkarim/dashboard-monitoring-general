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
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { ErrorDisplay } from "@/components/common/error-display";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { activityFormSchema, ActivityFormValues, PartialActivityFormValues } from "../schemas/activities.schemas";

interface ActivityFormProps {
    initialData?: ActivityFormValues | null;
    onSubmit: (data: PartialActivityFormValues) => void;
    isLoading?: boolean;
}

export function ActivityForm({ initialData, onSubmit, isLoading }: ActivityFormProps) {
    const {
        data: processus,
        isPending: isPendingProcessus,
        isError: isErrorProcessus,
        error: errorProcessus
    } = useGetProcessus();

    const form = useForm<PartialActivityFormValues>({
        resolver: zodResolver(activityFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            startDate: initialData?.startDate || "",
            endDate: initialData?.endDate || "",
            processus: initialData?.processus
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
                                    placeholder="Activity start date"
                                    date={field.value ? new Date(field.value) : undefined}
                                    setDate={(value) =>
                                        field.onChange(value ? value.toISOString() : undefined)
                                    }
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
                                    placeholder="Activity end date"
                                    date={field.value ? new Date(field.value) : undefined}
                                    setDate={(value) =>
                                        field.onChange(value ? value.toISOString() : undefined)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Processus select */}
                {!isPendingProcessus && !isErrorProcessus && (
                    <FormField control={form.control} name="processus" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Processus</FormLabel>
                            <Select onValueChange={(value) => { field.onChange({ id: value }) } } defaultValue={field.value?.id.toString()}>
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

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update activity" : "Create activity"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
