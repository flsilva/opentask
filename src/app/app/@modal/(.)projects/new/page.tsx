import 'server-only';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';

export default function NewProjectModalInterceptingPage() {
  return <ProjectForm renderOnModal />;
}
