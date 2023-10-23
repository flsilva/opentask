import { ServerError } from '@/modules/app/shared/errors/ServerResponse';

interface ErrorListProps {
  readonly errors: Array<ServerError>;
}

export const ErrorList = ({ errors }: ErrorListProps) =>
  errors && errors.length > 0
    ? errors.map((error) => (
        <p key={error.message} className="text-sm mb-2 text-red-600">
          {error.message}
        </p>
      ))
    : null;
