import React from "react";
import InputLabel from "./InputLabel";
import InputErrorMessage from "./InputErrorMessage";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
}

function TimeSelectRef(props: SelectProps, ref: React.Ref<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="outline-brand-primary border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm placeholder:text-[9A9C9F]"
        ref={ref}
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {props.errorMessage && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </div>
  );
}

const TimeSelect = React.forwardRef(TimeSelectRef);

export default TimeSelect;
