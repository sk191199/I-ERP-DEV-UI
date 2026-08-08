import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMemo, useState, type ReactNode } from "react";
import { AppInput, type AppInputOption } from "./AppInput";
import { AppButton } from "./AppButton";

export type FieldType = "text" | "number" | "email" | "date" | "select" | "textarea";

export interface FieldMeta {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  helperText?: string;
  placeholder?: string;
  options?: AppInputOption[];
  /** Column span out of 12 on desktop. */
  span?: 3 | 4 | 6 | 12;
  disabled?: boolean;
}

export interface SectionMeta {
  title?: string;
  description?: string;
  fields: FieldMeta[];
}

export interface FormMeta {
  sections: SectionMeta[];
  submitLabel?: string;
  cancelLabel?: string;
}

export type FormValues = Record<string, string>;

export interface AppFormProps {
  meta: FormMeta;
  initialValues?: FormValues;
  submitting?: boolean;
  onSubmit: (values: FormValues) => void;
  onCancel?: () => void;
  actions?: ReactNode;
}

/**
 * Metadata-driven form renderer. Screens declare fields as data; layout,
 * validation and actions come from the design system.
 */
export function AppForm({
  meta,
  initialValues,
  submitting = false,
  onSubmit,
  onCancel,
  actions,
}: AppFormProps) {
  const defaults = useMemo<FormValues>(() => {
    const base: FormValues = {};
    for (const section of meta.sections) {
      for (const field of section.fields) base[field.name] = "";
    }
    return { ...base, ...initialValues };
  }, [meta, initialValues]);

  const [values, setValues] = useState<FormValues>(defaults);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (next: FormValues) => {
    const found: Record<string, string> = {};
    for (const section of meta.sections) {
      for (const field of section.fields) {
        const value = (next[field.name] ?? "").trim();
        if (field.required && !value) found[field.name] = `${field.label} is required`;
        else if (field.type === "email" && value && !/^[^@\s]+@[^@\s]+\.\w+$/.test(value))
          found[field.name] = "Enter a valid email address";
      }
    }
    return found;
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length === 0) onSubmit(values);
      }}
    >
      <Stack spacing={4}>
        {meta.sections.map((section, index) => (
          <Stack key={section.title ?? `section-${index}`} spacing={2}>
            {section.title && (
              <Box>
                <Typography variant="subtitle2">{section.title}</Typography>
                {section.description && (
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                )}
              </Box>
            )}
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(12, 1fr)" },
              }}
            >
              {section.fields.map((field) => (
                <Box
                  key={field.name}
                  sx={{ gridColumn: { xs: "span 1", md: `span ${field.span ?? 6}` } }}
                >
                  <AppInput
                    name={field.name}
                    label={field.label}
                    required={field.required ?? false}
                    disabled={field.disabled ?? submitting}
                    placeholder={field.placeholder ?? ""}
                    type={field.type === "textarea" ? "text" : (field.type ?? "text")}
                    multiline={field.type === "textarea"}
                    minRows={field.type === "textarea" ? 3 : undefined}
                    {...(field.options ? { options: field.options } : {})}
                    {...(field.type === "date" ? { InputLabelProps: { shrink: true } } : {})}
                    value={values[field.name] ?? ""}
                    error={Boolean(errors[field.name])}
                    helperText={errors[field.name] ?? field.helperText ?? " "}
                    onChange={(event) =>
                      setValues((prev) => ({
                        ...prev,
                        [field.name]: event.target.value,
                      }))
                    }
                  />
                </Box>
              ))}
            </Box>
          </Stack>
        ))}

        <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end" }}>
          {actions}
          {onCancel && (
            <AppButton emphasis="tertiary" tone="neutral" onClick={onCancel}>
              {meta.cancelLabel ?? "Cancel"}
            </AppButton>
          )}
          <AppButton type="submit" loading={submitting}>
            {meta.submitLabel ?? "Save"}
          </AppButton>
        </Stack>
      </Stack>
    </Box>
  );
}
