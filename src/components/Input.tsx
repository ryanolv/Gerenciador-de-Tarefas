import React from "react";
import InputLabel from "./InputLabel";
import InputErrorMessage from "./InputErrorMessage";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

function InputRef(
  { label, errorMessage, ...rest }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="outline-brand-primary border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm placeholder:text-[9A9C9F]"
        ref={ref}
        {...rest}
      />
      <InputErrorMessage>{errorMessage}</InputErrorMessage>
    </div>
  );
}

const Input = React.forwardRef(InputRef);

export default Input;
