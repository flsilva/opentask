import 'server-only';
import { ProjectFormController } from '@/modules/app/projects/ProjectFormController';

export default function NewProjectModalInterceptingPage() {
  return <ProjectFormController shouldRenderOnModal />;
}
