import React from "react";

const FormInput = ({
  name,
  type,
  className,
  id,
  onChange,
  value,
  checked,
  onClick
}) => {
  return (
    <>
      <input
        name={name}
        className={className}
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        checked={checked}
        onClick={onClick}
      />
    </>
  );
};

export default FormInput;
