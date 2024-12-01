import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import Gradient from './Gradient';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <Gradient className="w-72 h-10 p-0.5 rounded-full hover:shadow-md">
      <input type="text" ref={ref} className={clsx('w-full h-full rounded-full bg-white px-4 py-2 focus:outline-none', className)} {...props} />
    </Gradient>
  );
});

export default TextInput

