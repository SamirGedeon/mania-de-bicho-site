import { MessageCircle } from 'lucide-react';
import { storeInfo } from '@/data/store';
import { whatsappHref } from '@/lib/whatsapp';
export function SearchHelp({ query }: { query: string }) {
  const term = query.trim();
  const href = whatsappHref(
    storeInfo.whatsapp,
    term
      ? `Olá, Mania de Bicho! Procurei por "${term}" no site e não encontrei. Vocês têm esse produto ou alguma alternativa disponível?`
      : 'Olá, Mania de Bicho! Não encontrei produtos com os filtros que escolhi no site. Podem me ajudar?',
  );
  return (
    <div className="search-help">
      <strong>Não encontrou o que procura?</strong>
      <p>Consulte nossa equipe sobre outras opções disponíveis na loja.</p>
      {href && (
        <a
          className="pill cta"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} />
          Perguntar pelo WhatsApp
        </a>
      )}
    </div>
  );
}
