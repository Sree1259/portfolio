/**
 * Smooth scrolls to the section with the given ID, offsetting by the navbar height.
 * Safe to call in SSR — returns immediately if `window` is not available.
 * Does NOT throw if the target element is not found.
 */
export function smoothScrollTo(sectionId: string): void {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(sectionId);
  if (!element) return;

  const navbarHeight =
    document.querySelector('nav')?.getBoundingClientRect().height ?? 64;

  const top =
    element.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Returns the sectionId of the section currently occupying the majority of
 * the viewport (i.e. the section whose top edge is closest to — but not past —
 * the navbar bottom).  Returns `null` when called in SSR or when no section
 * is found.
 */
export function getActiveSection(sectionIds: string[]): string | null {
  if (typeof window === 'undefined') return null;

  const navbarHeight =
    document.querySelector('nav')?.getBoundingClientRect().height ?? 64;

  let activeId: string | null = null;
  let closestDistance = Infinity;

  for (const id of sectionIds) {
    const element = document.getElementById(id);
    if (!element) continue;

    const { top } = element.getBoundingClientRect();

    // Distance from the navbar bottom to the section's top edge.
    // We only consider sections whose top has reached or passed the navbar.
    const distance = top - navbarHeight;

    if (distance <= 0 && Math.abs(distance) < closestDistance) {
      closestDistance = Math.abs(distance);
      activeId = id;
    }
  }

  return activeId;
}
