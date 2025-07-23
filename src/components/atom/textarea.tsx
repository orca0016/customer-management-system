import { classNames } from "../../utils/classnames";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
}

export const TextAriaInput: React.FC<IInputProps> = ({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
  className,
  ...props
}) => {
  return (
    <div>
      <textarea
      
        className={classNames(
          className ||
            "w-full border border-gray-300 px-3 py-2 rounded-lg disabled:bg-gray-100",
          error ? "!border-red-500" : ""
        )}
        {...props}
      ></textarea>
      {error && (
        <p className="text-red-500 mt-1 text-xs font-medium">{error}</p>
      )}
    </div>
  );
};
