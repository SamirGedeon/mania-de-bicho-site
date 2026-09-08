'use client';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBrowsing } from './browsing-provider';
export function FavoriteButton({
  id,
  name,
  withLabel = false,
}: {
  id: string;
  name: string;
  withLabel?: boolean;
}) {
  const { favorites, ready, dispatch, storageAvailable } = useBrowsing();
  const saved = favorites.includes(id);
  return (
    <div className={withLabel ? 'favorite-detail' : 'favorite-corner'}>
      <Button
        variant="ghost"
        className={`favorite-button ${withLabel ? 'favorite-labeled' : ''}`}
        aria-label={`${saved ? 'Remover dos' : 'Adicionar aos'} favoritos: ${name}`}
        aria-pressed={saved}
        disabled={!ready}
        onClick={() => dispatch({ type: 'favorite', id })}
      >
        <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
        {withLabel && (saved ? 'Salvo nos favoritos' : 'Salvar nos favoritos')}
      </Button>
      {withLabel && !storageAvailable && (
        <p className="demo-note">
          O navegador não permitiu salvar seus favoritos para a próxima visita.
        </p>
      )}
    </div>
  );
}
