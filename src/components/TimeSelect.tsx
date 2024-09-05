import React from "react";
import InputLabel from "./InputLabel";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
}

function TimeSelectRef(props: SelectProps, ref: React.Ref<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[9A9C9F]"
        ref={ref}
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {props.errorMessage && (
        <p className="text-left text-xs text-red-500">{props.errorMessage}</p>
      )}
    </div>
  );
}

const TimeSelect = React.forwardRef(TimeSelectRef);

export default TimeSelect;
