import 'server-only';
import { ProjectFormApplication } from '@/modules/app/project/ProjectFormApplication';

export default function NewProjectModalInterceptingPage() {
  return <ProjectFormApplication shouldRenderOnModal />;
}
