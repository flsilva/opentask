import 'server-only';
import { ProjectFormApplication } from '@/modules/app/projects/ProjectFormApplication';

export default function NewProjectModalInterceptingPage() {
  return <ProjectFormApplication shouldRenderOnModal />;
}
