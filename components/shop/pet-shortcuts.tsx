/* oxlint-disable next/no-html-link-for-pages */
import { Cat, Dog } from 'lucide-react';
export function PetShortcuts({ selected }: { selected?: 'dog' | 'cat' }) {
  return (
    <nav className="pet-shortcuts" aria-label="Comprar por pet">
      <span>Comprar por pet</span>
      <a
        className={`pill ${selected === 'dog' ? 'cta' : 'category-link'}`}
        href="/loja/caes"
        aria-current={selected === 'dog' ? 'page' : undefined}
      >
        <Dog size={22} />
        Para cães
      </a>
      <a
        className={`pill ${selected === 'cat' ? 'cta' : 'category-link'}`}
        href="/loja/gatos"
        aria-current={selected === 'cat' ? 'page' : undefined}
      >
        <Cat size={22} />
        Para gatos
      </a>
    </nav>
  );
}
