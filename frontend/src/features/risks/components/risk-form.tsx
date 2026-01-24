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
import { RiskFormValues, PartialRiskFormSchema, riskFormSchema } from "@/features/risks/schemas/risks.schemas";

interface RiskFormProps {
    initialData?: PartialRiskFormSchema | null;
    onSubmit: (data: RiskFormValues) => void;
    isLoading?: boolean;
}

export function RiskForm({ initialData, onSubmit, isLoading }: RiskFormProps) {
    const user = useAuthStore((state) => state.user);

    const form = useForm<RiskFormValues>({
        resolver: zodResolver(riskFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            severity: initialData?.severity || 1,
            occurrence: initialData?.occurrence || 1,
            detection: initialData?.detection || 1,
        },
    });

    const handleSubmit = (values: RiskFormValues) => {
        const apiData = {
            ...values,
            createdBy: user?.id,
        };
        onSubmit(apiData);
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title </FormLabel>
                            < FormControl >
                                <Input placeholder="Risk title..." {...field} value={field.value ?? ""} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    )
                    }
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description </FormLabel>
                            < FormControl >
                                <Input placeholder="Detailed description of the risk..." {...field} value={field.value ?? ""} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-3 gap-4" >
                    <FormField
                        control={form.control}
                        name="severity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Severity </FormLabel>
                                < FormControl >
                                    <Input placeholder="Risk severity..." {...field} value={field.value ?? ""} />
                                </FormControl>
                                < FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="occurrence"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Occurrence </FormLabel>
                                < FormControl >
                                    <Input placeholder="Risk occurrence..." {...field} value={field.value ?? ""} />
                                </FormControl>
                                < FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="detection"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Detection </FormLabel>
                                <FormControl >
                                    <Input placeholder="Risk detection..." {...field} value={field.value ?? ""} />
                                </FormControl>
                                < FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end pt-4" >
                    <Button type="submit" disabled={isLoading} >
                        {isLoading ? "Saving..." : initialData ? "Update Risk" : "Create Risk"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}