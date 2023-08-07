import { Datepicker, initTE } from "tw-elements";
import React, { useEffect, FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

const DateInput: FC<Props> = ({ setDate, error }) => {
  useEffect(() => {
    initTE({ Datepicker });

    const datePicker = document.querySelector("#datepicker");
    new Datepicker(datePicker!, {
      disablePast: true,
      confirmDateOnSelect: true,
      format: "yyyy/mm/dd",
    });

    datePicker!.addEventListener("dateChange.te.datepicker", (input: any) => {
      setDate(input.date.toString());
    });
  }, [setDate]);

  return (
    <div id="datepicker" className="relative mb-8 w-full">
      <input
        type="text"
        onChange={(e) => setDate(e.target.value)}
        placeholder="date"
        data-te-datepicker-toggle-ref
        data-te-datepicker-toggle-button-ref
        data-te-format="dd, mmm, yyyy"
        className="peer w-full h-12 rounded-lg outline-none border border-primary placeholder:select-none
        py-2 px-4 placeholder-transparent bg-table text-lg text-primaryColor small:text-2xl
        focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
        id="date"
      />
      <label
        htmlFor="date"
        className="absolute font-medium pointer-events-none select-none w-fit left-5 top-0 transition-all duration-300 
        text-sm peer-placeholder-shown:text-xl peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 
        peer-focus:top-0 peer-focus:text-sm peer-focus:left-5"
      >
        date
      </label>
      <p className="text-red-700 pl-4 text-xl">{error}</p>
    </div>
  );
};

export default DateInput;
