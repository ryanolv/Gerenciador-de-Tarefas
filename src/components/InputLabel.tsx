function InputLabel(props: any) {
  return (
    <label className="text-sm font-semibold text-[#35383E]" {...props}>
      {props.children}
    </label>
  );
}

export default InputLabel;
