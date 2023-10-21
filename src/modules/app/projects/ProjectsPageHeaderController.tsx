'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { ProjectsPageHeaderUI } from './ProjectsPageHeaderUI';

interface ProjectsPageHeaderControllerProps {
  readonly archived: boolean;
}

export const ProjectsPageHeaderController = ({
  archived = false,
}: ProjectsPageHeaderControllerProps) => {
  const router = useRouter();
  const onSwitchClick = (enabled: boolean) => {
    const path = enabled ? 'archived' : 'active';
    router.push(path);
  };

  return <ProjectsPageHeaderUI archived={archived} onSwitchClick={onSwitchClick} />;
};
