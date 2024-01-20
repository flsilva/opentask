import 'server-only';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { buttonGreenClassName } from '@/features/shared/ui/control/button/buttonClassName';
import { ErrorList } from '@/features/shared/ui/error/ErrorList';
import { getProjects } from '@/features/app/projects/data-access/ProjectsDataAccess';

export default async function OnboardingPage() {
  const { data: projects, errors } = await getProjects();
  if (errors) return <ErrorList errors={errors} />;
  if (projects && projects.length > 0) redirect('/app/today');

  return (
    <>
      <h2 className="mt-6 text-2xl">Welcome to OpenTask!</h2>
      <p className="mt-8 text-sm font-medium">You don&#39;t have any projects yet.</p>
      <Link href="/app/projects/new" className={twMerge(buttonGreenClassName, 'w-fit mt-8')}>
        Create your first!
      </Link>
    </>
  );
}
