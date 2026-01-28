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
import { Comment } from "../types/comments.types";
import { commentFormSchema, CommentFormValues } from "../schemas/comments.schemas";

interface CommentFormProps {
    initialData?: Comment | null;
    onSubmit: (data: CommentFormValues) => void;
    isLoading?: boolean;
}

export function CommentForm({ initialData, onSubmit, isLoading }: CommentFormProps) {
    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            content: initialData?.content || "",
            task: initialData?.task,
            author: initialData?.author,
        },
    });

    const handleSubmit = (values: CommentFormValues) => {
        onSubmit(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    name="content"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Input placeholder="Comment content" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update comment" : "Create comment"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
