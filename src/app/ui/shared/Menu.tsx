import Link from "next/link";

export default function Menu() {
  return (
    <ul>
      <li>
        <Link href="/">Landing Page</Link>
      </li>
      <li>
        <Link href="/projects">Projects</Link>
      </li>
    </ul>
  );
}
