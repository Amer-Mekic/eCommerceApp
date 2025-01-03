"use client";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
type formSubmitButtonProps = {
  // Specify what we should be able to pass to this button as props
  children: React.ReactNode; // children are props passed between opening and closing tag of <button> (<button> children go here <\button>)
  className?: string; // optional (?) classname attribute to pass
} & ComponentProps<"button">; // Accept all the same props a normal button element accepts (e.g. disabled, ...)

export default function FormSubmitButton({
  children,
  className,
  ...props // catch all other props from ComponentProps we specified along out own children and className (& ComponentProps<"button">;)
}: formSubmitButtonProps) {
  // destructure props passed to button
  const { pending } = useFormStatus(); // pending = true if request is still pending (still sending data to db)
  return (
    // 1st apply all the other props, our own later // required to disable button while pending
    <button {...props} className={className} type="submit" disabled={pending}>
      {pending && (
        <span className="loading loading-spinner text-primary"></span>
      )}
      {children}
    </button>
  );
}
