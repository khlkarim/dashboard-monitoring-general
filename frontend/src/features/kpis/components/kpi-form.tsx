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

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    sprint: z.object({ id: z.string() }).optional().nullable(),
    processus: z.object({ id: z.string() }).optional().nullable(),
    samplingRate: z.string().optional(),
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
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                description: initialData.description || "",
                sprint: initialData.sprint || null,
                processus: initialData.processus || null,
                samplingRate: initialData.samplingRate || "",
            });
        } else {
            form.reset({
                name: "",
                description: "",
                sprint: null,
                processus: null,
                samplingRate: "",
            });
        }
    }, [initialData, form]);

    const handleSubmit = (values: KpiFormValues) => {
        const apiData = {
            ...values,
            sprint: type === KpiType.SPRINT && values.sprint ? values.sprint : null,
            processus: type === KpiType.PROCESSUS && values.processus ? values.processus : null,
            manager: {
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
                                <Input placeholder="KPI Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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

                {type === KpiType.SPRINT && (
                    <FormField
                        control={form.control}
                        name="sprint"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sprint</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value?.id || ""}>
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
                )}

                {type === KpiType.PROCESSUS && (
                    <FormField
                        control={form.control}
                        name="processus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Processus</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value?.id || ""}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a processus" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="none">No Processus</SelectItem>
                                        {processus?.data.map((processus) => (
                                            <SelectItem key={processus.id} value={processus.id}>
                                                {processus.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update KPI" : "Create KPI"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
