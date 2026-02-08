import { NavPathLink } from "./nav-path-link";

export async function NavLayout({ children }: { children: React.ReactNode }) {
  const pages = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "mailto:contact@clarabaptista.com" },
  ];

  return (
    <>
      <nav className="fixed flex justify-end top-0 left-0 w-full px-(--grid-margin) py-2 z-10000">
        <ul>
          <li className="flex flex-row gap-4">
            {pages.map((page) => (
              <NavPathLink key={page.href} href={page.href}>
                {page.label}
              </NavPathLink>
            ))}
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
