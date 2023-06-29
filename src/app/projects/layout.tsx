export const metadata = {
  title: "Projects | Task Manager App",
  description: "Your Task Manager App projects.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Projects layout.</h1>
      {children}
    </div>
  );
}
