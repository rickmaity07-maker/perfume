"use client";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Field({ id, label, error, optional, children, className = "" }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow !text-[9px] text-ivory/50 flex justify-between">
        <span>{label}</span>
        {optional && <span className="normal-case tracking-normal text-ivory/30">Optional</span>}
      </label>
      {children}
      <p id={`${id}-err`} className="mt-2 text-xs text-[#e3a58f] min-h-4" aria-live="polite">{error}</p>
    </div>
  );
}

export const inputClass =
  "mt-2 w-full bg-transparent border-b border-ivory/20 focus:border-gilt outline-none py-3 text-[16px] text-ivory placeholder:text-ivory/25 transition-colors aria-[invalid=true]:border-[#e3a58f]";

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
