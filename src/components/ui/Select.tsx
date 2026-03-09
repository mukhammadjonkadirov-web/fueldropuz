"use client";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
}

export function Select({
  label,
  options,
  placeholder,
  error,
  hint,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          w-full rounded-xl border bg-white px-4 py-3 text-slate-900
          focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
          disabled:bg-slate-50 disabled:text-slate-500
          ${error ? "border-red-500" : "border-slate-300"}
          ${className}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${selectId}-hint`} className="mt-1 text-sm text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
