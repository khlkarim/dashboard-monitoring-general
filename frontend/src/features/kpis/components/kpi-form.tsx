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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { KpiResponse } from "@/features/kpis/schemas/kpis.schemas";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useGetSprints } from "@/features/sprints/hooks/use-get-sprints";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";

export enum KpiType {
    SPRINT = "SPRINT",
    PROCESSUS = "PROCESSUS",
}

// Conditional validation schema
const formSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
        sprint: z.object({ id: z.string().min(1) }).nullable().optional(),
        processus: z.object({ id: z.string().min(1) }).nullable().optional(),
        samplingRate: z.string({ message: "Sampling rate is required." }),
        type: z.nativeEnum(KpiType),
    })
    .refine((data) => {
        if (data.type === KpiType.SPRINT) {
            return !!(data.sprint && data.sprint.id && data.samplingRate);
        } else if (data.type === KpiType.PROCESSUS) {
            return !!(data.processus && data.processus.id);
        }
        return false;
    }, {
        message: "Processus is required.",
        path: ["processus"],
    });

type KpiFormValues = z.infer<typeof formSchema>;

interface KpiFormProps {
    initialData?: KpiResponse | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    type?: KpiType;
}

export function KpiForm({ initialData, onSubmit, isLoading, type = KpiType.PROCESSUS }: KpiFormProps) {
    const user = useAuthStore((state) => state.user);
    const { data: sprints } = useGetSprints();
    const { data: processus } = useGetProcessus();

    const form = useForm<KpiFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            sprint: initialData?.sprint || null,
            processus: initialData?.processus || null,
            samplingRate: initialData?.samplingRate || "",
            type,
        },
    });

    useEffect(() => {
        form.reset({
            name: initialData?.name || "",
            description: initialData?.description || "",
            sprint: initialData?.sprint || null,
            processus: initialData?.processus || null,
            samplingRate: initialData?.samplingRate || "",
            type,
        });
    }, [initialData, type, form]);

    const handleSubmit = (values: KpiFormValues) => {
        const apiData = {
            ...values,
            sprint: values.type === KpiType.SPRINT ? values.sprint : null,
            processus: values.type === KpiType.PROCESSUS ? values.processus : null,
            manager: { id: user?.id },
        };

        onSubmit(apiData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="KPI Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="KPI Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Sprint */}
                {type === KpiType.SPRINT && (
                    <>
                        <FormField
                            control={form.control}
                            name="sprint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sprint</FormLabel>
                                    <Select
                                        onValueChange={(val) => field.onChange(val === "none" ? null : { id: val })}
                                        value={field.value?.id || "none"}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a sprint" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="none">No Sprint</SelectItem>
                                            {sprints?.data.map((sprint) => (
                                                <SelectItem key={sprint.id} value={sprint.id}>
                                                    {sprint.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="samplingRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sampling Rate</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter sampling rate" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {/* Sampling Rate Input */}
                <FormField
                    control={form.control}
                    name="samplingRate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sampling Rate</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter sampling rate"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Processus */}
                {type === KpiType.PROCESSUS && (
                    <FormField
                        control={form.control}
                        name="processus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Processus</FormLabel>
                                <Select
                                    onValueChange={(val) => field.onChange(val === "none" ? null : { id: val })}
                                    value={field.value?.id || "none"}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a processus" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="none">No Processus</SelectItem>
                                        {processus?.data.map((proc) => (
                                            <SelectItem key={proc.id} value={proc.id}>
                                                {proc.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update KPI" : "Create KPI"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

