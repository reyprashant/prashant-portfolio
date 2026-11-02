/**
 * FormField: label, control, hint and error with the aria wiring done once.
 * Controls are square (radius 0), 54px tall, with a 1px strong border that
 * meets the 3:1 UI contrast requirement, and the shared focus ring.
 */
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

const controlClasses =
  "type-body w-full border border-line-strong bg-white px-4 text-ink placeholder:text-muted/70 aria-[invalid=true]:border-accent-dark";

function Shell({
  id,
  label,
  hint,
  error,
  className,
  children,
}: BaseProps & { children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="type-button text-fg">
        {label}
        {hint && (
          <span className="type-small ml-2 font-normal text-fg-muted">({hint})</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="type-small text-accent-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string) {
  return error ? `${id}-error` : undefined;
}

export function InputField({
  id,
  label,
  hint,
  error,
  className,
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Shell id={id} label={label} hint={hint} error={error} className={className}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className={cn(controlClasses, "h-(--button-h)")}
        {...rest}
      />
    </Shell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  className,
  options,
  placeholder,
  ...rest
}: BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: readonly string[];
    placeholder: string;
  }) {
  return (
    <Shell id={id} label={label} hint={hint} error={error} className={className}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className={cn(controlClasses, "h-(--button-h)")}
        defaultValue=""
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Shell>
  );
}

export function TextareaField({
  id,
  label,
  hint,
  error,
  className,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Shell id={id} label={label} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className={cn(controlClasses, "min-h-40 py-3")}
        {...rest}
      />
    </Shell>
  );
}
