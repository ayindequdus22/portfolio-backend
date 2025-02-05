import { ButtonHTMLAttributes,  ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  className = '',
  ...rest
}) => {
  // (props: { child: ReactNode, fn: MouseEventHandler<HTMLButtonElement> ,className:string | null}) 
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      {...rest}
    >
      {children}
    </button>);
}

export default Button;
