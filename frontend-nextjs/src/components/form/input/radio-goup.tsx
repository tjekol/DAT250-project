"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VoteOption } from "@/interfaces";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "..";

type RadioGroupSelectProps = {
  name: string;
  options: VoteOption[];
};
export function RadioGroupSelect({ name, options }: RadioGroupSelectProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup {...field} onValueChange={field.onChange}>
              {options.map((option) => {
                const idToString = option.id.toString();
                return (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={idToString} id={idToString} />
                    <Label htmlFor={idToString}>{option.caption}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
