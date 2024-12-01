"use client";

import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { FieldInput } from "../form/input";
import { CalendarForm } from "../form/input/date-picker";
import { FormCheckbox } from "../ui/checkbox";
import { createPollAction } from "./create-poll-action";
import {
  createPollDefaultValues,
  createPollSchema,
} from "./create-poll-schema";
import Options from "./options";

export default function CreatePoll() {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(createPollSchema),
    defaultValues: createPollDefaultValues,
  });

  const { execute, isExecuting, hasSucceeded } = useAction(createPollAction);

  if (hasSucceeded) {
    queryClient.invalidateQueries({ queryKey: ["polls"] });
  }
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(async (data) => {
          execute({ ...data });
        })}
      >
        <Card>
          <CardHeader>
            <CardTitle>Create Poll</CardTitle>
            <CardDescription>
              Create a poll with multiple options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FieldInput
              label="Question"
              name="question"
              placeholder="What is your favorite color?"
            />
            <Options />
            <div className="flex w-fit">
              <CalendarForm
                label="Valid until"
                name="validUntil"
                placeholder="Select a date"
              />
            </div>
            <FormCheckbox name="isPublic" label="Public Poll" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" isLoading={isExecuting}>
              Create Poll
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
