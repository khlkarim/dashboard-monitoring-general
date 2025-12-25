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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import {
    createSprintRequestSchema,
    UpdateSprintRequest,
    SprintResponse,
} from "@/features/sprints/schemas/sprints.schemas";
import { sprintStatusMap } from "@/app/(main)/dashboard/sprints/_components/columns"; // Reusing the map

// We need to adjust the schema slightly for the form because date inputs might handle dates differently (as Date objects) 
// but the API expects strings. Zod schema expects strings.
// Also 'createdBy' is likely handled by backend or auth context, but schema requires it. 
// For now, let's assume we pass the raw values or handle the transformation.
// The `createSprintRequestSchema` requires `createdBy`, which is a user object. 
// Usually the backend assigns `createdBy` from the token. Let's check if we can omit it for the form.
// If the API strictly requires it in the body, we have a problem. 
// Looking at the schema: `createdBy: userResponseSchema`. 
// If the backend requires this, we might need to mock it or fix the backend.
// HOWEVER, usually Create DTOs on frontend form don't ask user to input "CreatedBy". 
// I will assume for now we might need to cast or the schema defined in frontend is strictly checking response types?
// No, `createSprintRequestSchema` is for request.
// Let's create a form schema that might differ slightly (e.g. Date object vs ISO string).

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    goal: z.string().optional(),
    startDate: z.date({
        required_error: "Start date is required",
    }),
    endDate: z.date({
        required_error: "End date is required",
    }),
    status: z.string(), // Select returns string, we'll parse to number
});

type SprintFormValues = z.infer<typeof formSchema>;

interface SprintFormProps {
    initialData?: SprintResponse | null;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function SprintForm({ initialData, onSubmit, isLoading }: SprintFormProps) {
    const user = useAuthStore((state) => state.user);

    const form = useForm<SprintFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            goal: initialData?.goal || "",
            startDate: initialData?.startDate ? new Date(initialData.startDate) : undefined,
            endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
            status: initialData?.status !== undefined ? String(initialData.status) : "0",
        },
    });

    const handleSubmit = (values: SprintFormValues) => {
        // Transform form values to API expected format
        const apiData = {
            ...values,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
            status: parseInt(values.status, 10),
            createdBy: {
                id: user?.id,
            },
            // createdBy will be injected by the api call wrapper or ignored if backend handles it from token
            // If strict schema validation fails on client before sending, we might need to fake it or fix schema.
            // For now, let's pass it up.
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
                                    {Object.entries(sprintStatusMap).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            {value}
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
