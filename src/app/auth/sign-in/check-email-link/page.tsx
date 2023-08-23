import { MailIcon } from '@/app/modules/common/icon/MailIcon';

export default function CheckEmailLink({ searchParams }: { searchParams: { email?: string } }) {
  const getEmailText = () =>
    searchParams && typeof searchParams.email === 'string' ? (
      <span className="font-semibold">{searchParams.email}</span>
    ) : (
      'your email'
    );

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mt-10 text-2xl font-medium text-black md:text-3xl">Please check your email</h2>
      <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <MailIcon width="5rem" height="5rem" className="my-6 md:my-10" />
        <p className="mb-2 text-center">We just emailed a link to {getEmailText()}.</p>
        <p className="mb-6 text-center">Click on it, and you&apos;ll be signed in.</p>
        <p className="text-center">
          If you don&apos;t see it, you may need to{' '}
          <span className="font-semibold">check your spam folder</span>.
        </p>
      </div>
    </div>
  );
}
