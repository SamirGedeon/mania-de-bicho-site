/* oxlint-disable next/no-html-link-for-pages */
import { MapPin, Clock3, MessageCircle } from 'lucide-react';
import { storeInfo } from '@/data/store';
import { whatsappHref } from '@/lib/whatsapp';
export function StoreDetails() {
  const contact = whatsappHref(storeInfo.whatsapp);
  return (
    <section className="store-details" aria-labelledby="store-title">
      <div className="store-intro">
        <span className="tag">Perto de você e do seu pet</span>
        <h2 id="store-title">Conheça a Mania de Bicho</h2>
        <p>
          Converse com a nossa equipe para escolher seus produtos e combinar sua
          visita.
        </p>
      </div>
      <div className="store-info-grid">
        <article>
          <MapPin size={24} />
          <h3>Visite a loja</h3>
          <p>
            {storeInfo.address || 'Consulte o endereço com a nossa equipe.'}
          </p>
          {storeInfo.mapsUrl && (
            <a
              href={storeInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver localização no Google Maps ↗
            </a>
          )}
        </article>
        <article>
          <Clock3 size={24} />
          <h3>Horário de atendimento</h3>
          {storeInfo.hours.length ? (
            storeInfo.hours.map((h) => <p key={h}>{h}</p>)
          ) : (
            <p>Consulte os horários pelo WhatsApp antes de sua visita.</p>
          )}
          {contact && (
            <a href={contact} target="_blank" rel="noopener noreferrer">
              Consultar horários ↗
            </a>
          )}
        </article>
      </div>
      {contact && (
        <a
          className="pill cta store-whatsapp"
          href={contact}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} /> Falar pelo WhatsApp
        </a>
      )}
      {storeInfo.reviews.length > 0 && (
        <div className="store-reviews">
          <h3>Quem compra com a gente</h3>
          {storeInfo.reviews.map((r) => (
            <blockquote key={r.name + r.text}>
              <p>“{r.text}”</p>
              <cite>{r.name}</cite>
              {r.sourceUrl && (
                <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Ver avaliação original ↗
                </a>
              )}
            </blockquote>
          ))}
        </div>
      )}
    </section>
  );
}
