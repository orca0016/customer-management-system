import { classNames } from "../../utils/classnames";

type variant = "primary" | "danger" | "ghost" | "secondary";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: variant;
}

const variantClasses = (v: variant) => {
  switch (v) {
    case "danger":
      return "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-400";
    case "secondary":
      return "bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-400";
    case "ghost":
      return "bg-slate-300 text-white hover:bg-slate-400 disabled:bg-slate-200";
    default:
      return "bg-slate-600 text-white hover:bg-slate-500 disabled:bg-slate-400";
  }
};

export const Button: React.FC<IButtonProps> = ({
  className,
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={classNames(
        variantClasses(variant),
        "font-semibold px-3 py-2 rounded-lg cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
