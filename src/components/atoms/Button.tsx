import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  handleClick?: any;
}

const Button: React.FC<ButtonProps> = ({ children, handleClick }) => {
  return (
    <div
      className="bg-col-1 px-6 py-2 rounded-md hover:bg-col-3 cursor-pointer 
      flex justify-center items-center gap-2 font-bold text-white"
      onClick={() => handleClick()}
    >
      {children}
    </div>
  );
};

export default Button;
