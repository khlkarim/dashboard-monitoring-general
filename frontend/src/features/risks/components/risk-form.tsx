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
import {
    RiskFormValues,
    riskFormSchema,
} from "@/features/risks/schemas/risks.schemas";
import { Risk } from "../types/risks.types";
import { useGetProcessus } from "@/features/processus/hooks/use-get-processus";

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
    const { data: processus } = useGetProcessus();

    const form = useForm<RiskFormValues>({
        resolver: zodResolver(riskFormSchema),
        defaultValues: {
            title: initialData?.title ?? "",
            description: initialData?.description ?? "",
            severity: initialData?.severity ?? 1,
            occurrence: initialData?.occurrence ?? 1,
            detection: initialData?.detection ?? 1,
            processus: initialData?.processus ?? { id: "" },
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
                    <FormField
                        key={"severity"}
                        control={form.control}
                        name={"severity"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {"Severity"}
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
                    <FormField
                        key={"occurrence"}
                        control={form.control}
                        name={"occurrence"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {"Occurrence"}
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
                    <FormField
                        key={"detection"}
                        control={form.control}
                        name={"detection"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {"Detection"}
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
                </div>

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

