import { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface GradientProps extends HTMLAttributes<HTMLDivElement> {}

const Gradient = forwardRef<HTMLDivElement, GradientProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={clsx("bg-gradient-to-r from-primary-red to-primary-orange", className)} {...props} />;
});



export default Gradient