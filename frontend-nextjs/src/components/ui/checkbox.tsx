import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/utils/cn";
import { Check } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

const Checkbox = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) => (
  <CheckboxPrimitive.Root
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

type FormCheckboxProps = {
  name: string;
  label: string;
  description?: string;
};

function FormCheckbox({ name, label, description }: FormCheckboxProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {description && <FormDescription>{description}</FormDescription>}
          <div className="flex w-fit gap-4">
            <FormControl>
              <div className="pt-1">
                <Checkbox
                  id={name}
                  {...field}
                  className="border-gray-300"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                  aria-label={label}
                />
              </div>
            </FormControl>
            <FormLabel htmlFor={name} className="my-auto text-lg font-normal">
              {label}
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export { Checkbox, FormCheckbox };
