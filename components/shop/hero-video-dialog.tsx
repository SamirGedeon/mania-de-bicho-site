'use client';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { brandStory } from '@/data/brand-story';

export function HeroVideoDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="brand-video-backdrop" />
        <DialogPrimitive.Popup className="brand-video-dialog">
          <div className="brand-video-heading">
            <div>
              <DialogTitle>Conheça a Mania de Bicho</DialogTitle>
              <DialogDescription>
                Prévia ilustrativa — em breve, o vídeo real da loja.
              </DialogDescription>
            </div>
            <DialogClose
              render={
                <Button
                  className="brand-video-close"
                  variant="ghost"
                  size="icon"
                  aria-label="Fechar vídeo"
                />
              }
            >
              <X size={24} />
            </DialogClose>
          </div>
          {open && (
            <video
              className="brand-video-player"
              src={brandStory.video}
              poster={brandStory.videoPoster}
              controls
              playsInline
              preload="metadata"
              aria-label="Vídeo ilustrativo da Mania de Bicho"
            >
              <track
                kind="captions"
                src="/assets/mania-de-bicho-preview.vtt"
                srcLang="pt-BR"
                label="Português"
                default
              />
              Seu navegador não reproduz este vídeo.{' '}
              <a href={brandStory.video}>Abrir vídeo</a>
            </video>
          )}
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
