import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Title = ({ children, ...props }: Props) => {
  return (
    <div
      className="w-full bg-primary  md:w-100vw z-50 fixed h-nav-height bg-pink flex justify-start items-center"
      {...props}
    >
      {children}
    </div>
  );
};

export default Title;
