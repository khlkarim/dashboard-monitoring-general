
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
    RiskFormValues,
    riskFormSchema,
} from "@/features/risks/schemas/risks.schemas";
import { Risk } from "../types/risks.types";

interface RiskFormProps {
    initialData?: Risk | null;
    onSubmit: (data: RiskFormValues) => void;
    isLoading?: boolean;
}

export function RiskForm({
    initialData,
    onSubmit,
    isLoading,
}: RiskFormProps) {
    const user = useAuthStore((state) => state.user);

    const form = useForm<RiskFormValues>({
        resolver: zodResolver(riskFormSchema),
        defaultValues: {
            title: initialData?.title ?? "",
            description: initialData?.description ?? "",
            severity: initialData?.severity ?? 1,
            occurrence: initialData?.occurrence ?? 1,
            detection: initialData?.detection ?? 1,
        },
    });

    const handleSubmit = (values: RiskFormValues) => {
        const apiData = {
            ...values,
            createdBy: {
                id: user?.id,
            },
        };

        onSubmit(apiData);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                {/* TITLE */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Risk title..."
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* DESCRIPTION */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Detailed description of the risk..."
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* NUMERIC FIELDS */}
                <div className="grid grid-cols-3 gap-4">
                    {["severity", "occurrence", "detection"].map((name) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name as keyof RiskFormValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {name.charAt(0).toUpperCase() + name.slice(1)}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            {...field}
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value === ""
                                                        ? ""
                                                        : Number(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading
                            ? "Saving..."
                            : initialData
                                ? "Update Risk"
                                : "Create Risk"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

