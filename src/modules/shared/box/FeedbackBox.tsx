import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { FeedbackIcon } from '../icons/FeedbackIcon';

interface FeedbackBoxProps extends ChildrenProps, ClassNamePropsOptional {}

export const FeedbackBox = ({ children, className }: FeedbackBoxProps) => (
  <div
    className={`flex flex-col bg-orange-50 p-6 rounded-2xl border border-[rgb(229, 231, 235)] ${
      className ? className : ''
    }`}
  >
    <h3>
      <FeedbackIcon className="fill-orange-700" />
    </h3>
    <div className="flex mt-6 text-sm whitespace-pre-line">{children}</div>
  </div>
);
