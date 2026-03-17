import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface ButtonProps {
  size: SizeType;
  color: ColorType;
  title: string;
  onClick: () => void;
  children?: React.JSX.Element;
  disabled?: boolean; 
}

export const Button = (props: ButtonProps) => {
  const { size, color, title, onClick, disabled = false } = props;
  const defaultClass = "flex justify-center items-center rounded-2 h-[100px] w-[400px] px-4 py-2";

  const classes = {
    colors: {
      primary: {
        button: "bg-red-500",
        text: "text-white",
      },
      secondary: {
        button: "bg-green-500",
        text: "text-yellow",
      },
    },
    sizes: {
      small: "rounded-[100px] font-sm",
      middle: "rounded-[14px] font-base",
      large: "rounded-[16px] font-base min-h-[56px]",
    },
  };


    let disabledClasses = "cursor-pointer";
    if (disabled) {
        disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";
    }

    const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };


    return (
    <div
      className={`${defaultClass} ${classes.sizes[size]} ${classes.colors[color].button} ${disabledClasses}`}
      onClick={handleClick}
    >
      <span className={classes.colors[color].text}>{title}</span>
    </div>
  );
};