import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import { useState, useEffect, useRef, ElementRef, useCallback } from "react";
import { useFetch } from "../hooks";
import { TheaterType, PaginationType } from "../../types";

const Dropdown = ({
  setId,
}: {
  setId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [selected, setSelected] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);
  const [items, setItems] = useState<TheaterType[]>([]);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useFetch(
    `/api/admin/theater/all?count=4&page=${page}`
  );
  const dropdownRef = useRef<ElementRef<"ul">>(null);
  const buttonRef = useRef<ElementRef<"div">>(null);
  useEffect(() => {
    if (!isLoading) {
      const list = data.data.data as TheaterType[];
      const pagination = data as PaginationType<TheaterType>;
      setItems(list);
      setMaxPage(pagination.data.last_page);
    }
  }, [data, page, isLoading]);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    addEventListener("mousedown", handleClickOutside);
    addEventListener("keydown", handleKeyDown);
    return () => {
      removeEventListener("mousedown", handleClickOutside);
      removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return (
    <div className="relative mb-8 w-full">
      <div
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-12 cursor-pointer rounded-lg outline-none border border-primary flex justify-between items-center px-8 text-xl"
      >
        <span className="select-none">
          {selected ? selected : "theater name"}
        </span>
        <IoIosArrowDown />
      </div>
      {open ? (
        <ul
          ref={dropdownRef}
          className="absolute h-44 overflow-y-auto scrollbar-hide z-20 text-xl shadow-2xl top-full translate-y-1 w-full bg-white"
        >
          {items.map((theater, index) =>
            isLoading ? (
              <li
                key={index}
                className="px-8 py-1 select-none text-black duration-200 cursor-pointer"
              >
                loading.....
              </li>
            ) : (
              <li
                key={theater.id}
                onClick={() => {
                  setSelected(theater.name);
                  setOpen(false);
                  setId(theater.id);
                }}
                className="px-8 py-1 select-none hover:text-white hover:bg-primary duration-200 cursor-pointer"
              >
                {theater.name}
              </li>
            )
          )}
          <li className="px-8 py-1 select-none duration-200 flex justify-center items-center gap-5">
            <button
              type="button"
              onClick={() => {
                if (page === 1) {
                  return;
                } else setPage((prev) => prev - 1);
              }}
              className="bg-primary text-white text-2xl"
            >
              <IoIosArrowBack />
            </button>
            <button
              type="button"
              onClick={() => {
                if (page === maxPage) {
                  return;
                } else setPage((prev) => prev + 1);
              }}
              className="bg-primary text-white text-2xl"
            >
              <IoIosArrowForward />
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
