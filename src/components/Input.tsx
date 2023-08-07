import React, { useId, useCallback, FC } from "react";

interface propsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input: FC<propsType> = ({ label, setValue, error, ...props }) => {
  const handelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [setValue]
  );
  const id = useId();
  return (
    <div className="relative mb-8 w-full">
      <input
        {...props}
        className="peer w-full h-12 rounded-lg outline-none border border-primary placeholder:select-none
        py-2 px-4 placeholder-transparent bg-table text-lg text-primaryColor small:text-2xl
        focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
        id={id}
        name={label}
        placeholder={label}
        onChange={handelChange}
        autoComplete="off"
      />
      <label
        htmlFor={id}
        className="absolute font-medium pointer-events-none select-none w-fit left-5 top-0 transition-all duration-300 
                    text-sm peer-placeholder-shown:text-xl peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 
                    peer-focus:top-0 peer-focus:text-sm peer-focus:left-5"
      >
        {label}
      </label>
      {!!error ? <p className="text-red-700 pl-4 text-xl">{error}</p> : null}
    </div>
  );
};
export default Input;
