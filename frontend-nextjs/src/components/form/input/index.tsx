import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "..";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const inputStyling =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export function Input({ className, ...props }: InputProps) {
  const styling = cn(inputStyling, className);
  return <input {...props} className={styling} />;
}

type FieldInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  description?: string;
};

export function FieldInput({
  name,
  label,
  type = "text",
  placeholder,
  description,
}: FieldInputProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
