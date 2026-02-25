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
import { SkillFormValues, skillFormSchema } from "@/features/skills/schemas/skills.schemas";
import { Skill } from "../types/skills.types";

interface SkillFormProps {
  initialData?: Skill | null;
  onSubmit: (data: SkillFormValues) => void;
  isLoading?: boolean;
}

export function SkillForm({ initialData, onSubmit, isLoading }: SkillFormProps) {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  });

  const handleSubmit = (values: SkillFormValues) => {
    const apiData = {
      ...values,
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
                <Input placeholder="Skill title..." {...field} value={field.value ?? ""} />
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
                <Input placeholder="Detailed description of the skill..." {...field} value={field.value ?? ""} />
              </FormControl>
              < FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4" >
          <Button type="submit" disabled={isLoading} >
            {isLoading ? "Saving..." : initialData ? "Update Skill" : "Create Skill"}
          </Button>
        </div>
      </form>
    </Form >
  );
}
