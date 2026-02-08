function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
}) {
  return (
    <div className="input-group">
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInputWithLabel;