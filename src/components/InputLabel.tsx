function InputLabel(props: any) {
  return (
    <label className="text-brand-dark-blue text-sm font-semibold" {...props}>
      {props.children}
    </label>
  );
}

export default InputLabel;
