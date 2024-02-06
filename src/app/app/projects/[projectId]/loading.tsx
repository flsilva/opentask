import { ProjectPageSkeleton } from '@/features/app/projects/ui/ProjectPageSkeleton';

export default function ProjectPageLoading() {
  return <ProjectPageSkeleton className="mt-8" ssrOnly="Loading project..." />;
}
