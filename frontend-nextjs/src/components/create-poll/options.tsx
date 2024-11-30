"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FieldInput } from "../form/input";

export default function Options() {
  useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    name: "options",
  });

  const defaultValues = { option: "" };
  return (
    <div className="h-full space-y-12">
      <div className="space-y-2">
        <ul className="space-y-2">
          {fields.map((field, index) => (
            <li key={field.id} className="flex flex-row items-center gap-4">
              {index > 0 && (
                <Button
                  variant={"secondary"}
                  onClick={() => move(index, index - 1)}
                  className="h-full w-fit p-1"
                >
                  <ArrowUp size={20} />
                </Button>
              )}
              {index < fields.length - 1 && (
                <Button
                  variant={"secondary"}
                  onClick={() => move(index, index + 1)}
                  className="h-full w-fit p-1"
                >
                  <ArrowDown size={20} />
                </Button>
              )}
              <FieldInput
                name={`options.${index}.option` as const}
                placeholder="Some color..."
              />
              {fields.length > 1 && (
                <div className="space-y-4">
                  <Button
                    type="button"
                    variant={"link"}
                    className="flex w-fit flex-row gap-1 p-0 text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="w-fit">
          <Button
            type="button"
            variant={"link"}
            onClick={() => append(defaultValues)}
            className="w-fit p-0"
          >
            <Plus size={18} />
            {"Add option"}
          </Button>
        </div>
      </div>
    </div>
  );
}
