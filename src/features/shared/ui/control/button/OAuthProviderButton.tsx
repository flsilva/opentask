import { twMerge } from 'tailwind-merge';
import { OAuthProvider } from '@/features/auth/data-access/OAuthProvider';
import { ChildrenProps } from '@/features/shared/ui/ChildrenProps';
import { buttonWhiteClassName } from './buttonClassName';
import { SubmitButton } from './SubmitButton';

export interface OAuthProviderButtonProps extends ChildrenProps {
  readonly action: (formData: FormData) => void;
  readonly provider: OAuthProvider;
}

export const OAuthProviderButton = ({ action, children, provider }: OAuthProviderButtonProps) => (
  <form action={action}>
    <input type="hidden" name="provider" value={provider} />
    <SubmitButton
      className={twMerge(buttonWhiteClassName, 'mt-4 w-full')}
      labelClassName="gap-2"
      spinnerClassName="border-green-600 border-b-white"
    >
      {children}
    </SubmitButton>
  </form>
);
