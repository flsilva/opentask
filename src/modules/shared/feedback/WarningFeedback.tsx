import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { WarningIcon } from '@/modules/shared/icon/WarningIcon';

interface WarningFeedbackProps extends ChildrenProps, ClassNamePropsOptional {}

export const WarningFeedback = ({ children, className }: WarningFeedbackProps) => (
  <div
    className={twMerge(
      'flex flex-col bg-orange-50 p-6 rounded-2xl border border-[rgb(229, 231, 235)]',
      className,
    )}
  >
    <h3>
      <WarningIcon className="fill-orange-700" />
    </h3>
    <div className="flex mt-6 text-sm whitespace-pre-line">{children}</div>
  </div>
);
