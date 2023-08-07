import { initTE, Timepicker, Input } from "tw-elements";
import React, { useEffect, FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  time: string | number | readonly string[] | undefined;
  error: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

const TimeInput: FC<Props> = ({ time, setTime, error, ...props }) => {
  useEffect(() => {
    initTE({ Timepicker, Input });

    const timePickerValue =
      document.querySelector<HTMLInputElement>("#timepicker-value");
    if (timePickerValue) {
      new Timepicker(timePickerValue);

      timePickerValue.addEventListener("input", (event) => {
        if (event.target && (event.target as HTMLInputElement).value !== "") {
          setTime((event.target as HTMLInputElement).value);
        } else {
          setTime("");
        }
      });
    }
  }, [setTime]);
  return (
    <div
      data-te-with-icon="false"
      id="timepicker-value"
      className="relative mb-8 w-full"
    >
      <input
        readOnly
        value={time === "" ? "" : time}
        type="text"
        placeholder="time"
        data-te-toggle="timepicker-just-input"
        className="peer w-full h-12 rounded-lg outline-none border border-primary placeholder:select-none
        py-2 px-4 placeholder-transparent bg-table text-lg text-primaryColor small:text-2xl
        focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
        id="time party"
        {...props}
      />
      <label
        htmlFor="time party"
        className="absolute font-medium pointer-events-none select-none w-fit left-5 top-0 transition-all duration-300 
              text-sm peer-placeholder-shown:text-xl peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 
              peer-focus:top-0 peer-focus:text-sm peer-focus:left-5"
      >
        time party
      </label>
      <p className="text-red-700 pl-4 text-xl">{error}</p>
    </div>
  );
};

export default TimeInput;
