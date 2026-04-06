"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

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
import { DatePicker } from "@/components/ui/date-picker";
import { ErrorDisplay } from "@/components/common/error-display";

import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";
import {
    activityFormSchema,
    PartialActivityFormValues,
    UpdateActivityRequest,
} from "../schemas/activities.schemas";

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

import { Activity } from "../types/activities.types";

interface ActivityFormProps {
    initialData?: Activity | null;
    onSubmit: (data: UpdateActivityRequest) => void;
    isLoading?: boolean;
}

export function ActivityForm({
    initialData,
    onSubmit,
    isLoading,
}: ActivityFormProps) {
    const {
        data: processus,
        isPending: isPendingProcessus,
        isError: isErrorProcessus,
        error: errorProcessus,
    } = useGetProcessus();

    const form = useForm<PartialActivityFormValues>({
        resolver: zodResolver(activityFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            startDate: initialData?.startDate || undefined,
            endDate: initialData?.endDate || undefined,
            processus: initialData?.processus?.map((p) => p.id) || [],
        },
    });

    const handleSubmit = (values: PartialActivityFormValues) => {
        onSubmit({
            ...values,
            processus: values.processus?.map((id) => ({ id })),
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                {/* Title */}
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="activity title"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="activity description"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Start Date */}
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
                                        field.onChange(
                                            value ? value.toISOString() : undefined
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* End Date */}
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
                                        field.onChange(
                                            value ? value.toISOString() : undefined
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Processus Select */}
                {!isPendingProcessus &&
                    !isErrorProcessus &&
                    processus?.data && (
                        <FormField
                            name="processus"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Processus</FormLabel>
                                    <FormControl>
                                        {processus.data.length === 0 ? (
                                            <Empty>
                                                <EmptyHeader>
                                                    <EmptyTitle>No available processus</EmptyTitle>
                                                    <EmptyDescription>
                                                        There are no processus available to select.
                                                    </EmptyDescription>
                                                </EmptyHeader>
                                            </Empty>
                                        ) : (
                                            <ScrollArea className="h-28 p-4">
                                                <div className="space-y-3">
                                                    {processus.data.map((proc) => {
                                                        const isChecked = (field.value || []).includes(proc.id);
                                                        return (
                                                            <div key={proc.id} className="flex items-start gap-3">
                                                                <Checkbox
                                                                    checked={isChecked}
                                                                    onCheckedChange={(checked) => {
                                                                        const current = field.value || [];
                                                                        if (checked) {
                                                                            field.onChange([...current, proc.id]);
                                                                        } else {
                                                                            field.onChange(current.filter((id) => id !== proc.id));
                                                                        }
                                                                    }}
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium">
                                                                        {proc.label}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </ScrollArea>
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                {/* Loading */}
                {isPendingProcessus && (
                    <div className="flex items-center justify-center col-span-2">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading processus...
                    </div>
                )}

                {/* Error */}
                {isErrorProcessus && (
                    <div className="flex items-center justify-center col-span-2">
                        <ErrorDisplay
                            title="Failed to load processus."
                            error={errorProcessus}
                        />
                    </div>
                )}

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading
                            ? "Saving..."
                            : initialData
                                ? "Update activity"
                                : "Create activity"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}