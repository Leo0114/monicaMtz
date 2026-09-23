import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FieldShellProps {
  label: string;
  error?: string;
  className?: string;
}

type InputFieldProps = FieldShellProps &
  InputHTMLAttributes<HTMLInputElement> & { multiline?: false };
type TextareaFieldProps = FieldShellProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

export type FormFieldProps = InputFieldProps | TextareaFieldProps;

// Campo con etiqueta flotante: sube y se encoge al enfocar o al tener contenido.
const CONTROL =
  "peer block w-full border-0 border-b bg-transparent px-0 pt-7 pb-3 text-base text-ink placeholder-transparent outline-none transition-colors duration-500 focus:ring-0 focus-visible:outline-none aria-invalid:border-red-700/60 dark:aria-invalid:border-red-400/60";

const LABEL =
  "pointer-events-none absolute top-7 left-0 origin-left text-base text-muted transition-all duration-500 ease-apple peer-focus:top-1 peer-focus:scale-75 peer-focus:tracking-[0.2em] peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:uppercase";

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, className = "", multiline, ...props }, ref) => {
    const id = useId();
    const errorId = `${id}-error`;
    const a11y = {
      id,
      placeholder: label,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
    };

    return (
      <div className={`group relative ${className}`}>
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={5}
            data-lenis-prevent
            className={`${CONTROL} resize-none border-line`}
            {...a11y}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`${CONTROL} border-line`}
            {...a11y}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        <label htmlFor={id} className={LABEL}>
          {label}
        </label>
        {/* Línea que se dibuja al enfocar */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-700 ease-apple group-focus-within:scale-x-100"
        />
        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-xs text-red-700 dark:text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

FormField.displayName = "FormField";
