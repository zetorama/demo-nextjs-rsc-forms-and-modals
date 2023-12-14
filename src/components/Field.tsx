import { ComponentPropsWithoutRef, ReactNode, useId } from "react";

export function Field({ label, id, className, ...inputProps }: { label: ReactNode; } & ComponentPropsWithoutRef<'input'>) {
  const uniqId = useId() + id;
  return (
    <div className={className}>
      <label className="block" htmlFor={uniqId}>{label}</label>
      <input className="p-1 border rounded" id={uniqId} {...inputProps} />
    </div>
  );
}
