import React, { useRef, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils";

const modalVariant = cva(
  "rounded-lg relative bg-white z-40 flex flex-col max-h-[95vh] mr-0 md:ml-[--sidebar-width] p-3",
  {
    variants: {
      size: {
        default: "w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]",
        lg: "w-[95%] sm:w-[90%]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface Props extends VariantProps<typeof modalVariant> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  clickOutSide: boolean;
  className?: string;
}

const Modal: FC<Props> = ({
  isOpen,
  onClose,
  children,
  clickOutSide,
  className,
  size,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        clickOutSide &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => removeEventListener("mousedown", handleClick);
  }, [onClose, clickOutSide]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.dialog
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 w-screen h-screen bg-[#00000060] inset-0 flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: "-5vh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-2vh" }}
            transition={{ duration: 0.3 }}
            ref={modalRef}
            className={cn(modalVariant({ size, className }))}
          >
            <div
              className={`
              overflow-x-hidden overflow-y-auto
             w-full h-full cursor-default flex flex-col relative`}
            >
              {children}
            </div>
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;

// const popupOverlayStyles = ;

// const popupContainerStyles = ;
