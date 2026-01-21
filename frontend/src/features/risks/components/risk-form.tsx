"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
    RiskResponse,
} from "@/features/risks/schemas/risks.schemas";

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(2, "Description must be at least 2 characters"),
    criticity: z.number().min(1, "Criticity must be at least 1"),
});

type RiskFormValues = z.infer<typeof formSchema>;

interface RiskFormProps {
    initialData?: RiskResponse | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function RiskForm({ initialData, onSubmit, isLoading }: RiskFormProps) {
    const user = useAuthStore((state) => state.user);

    const form = useForm<RiskFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            criticity: initialData?.criticity || 1,
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
                                <Input placeholder="Risk title..." {...field} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    )
                    }
                />

                < FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description </FormLabel>
                            < FormControl >
                                <Input placeholder="Detailed description of the risk..." {...field} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="criticity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Criticity </FormLabel>
                            < FormControl >
                                <Input placeholder="Risk criticity..." {...field} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4" >
                    <Button type="submit" disabled={isLoading} >
                        {isLoading ? "Saving..." : initialData ? "Update Risk" : "Create Risk"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}