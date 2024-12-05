import { forwardRef,  HTMLAttributes } from 'react';
import clsx from 'clsx';
import Gradient from './Gradient';

interface DivProps extends HTMLAttributes<HTMLDivElement> {}

const GradientButton = forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => {
  return (

    <button>
        <Gradient ref={ref} className={clsx("flex items-center justify-center rounded-full text-white font-thin", className)} {...props}>
            {props.children}
        </Gradient>
    </button>
    
  );
});

export default GradientButton;

