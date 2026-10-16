import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import type { WeddingPhoto } from '@/data/wedding'

export function PhotoViewer({ photos, index, onChange }: { photos: WeddingPhoto[]; index: number | null; onChange: (index: number | null) => void }) {
  const photo = index === null ? undefined : photos[index]
  const move = (direction: number) => { if (index !== null && photos.length) onChange((index + direction + photos.length) % photos.length) }
  useEffect(() => {
    if (index === null) return
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % photos.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [index, photos.length, onChange])
  return <Dialog open={Boolean(photo)} onOpenChange={open => { if (!open) onChange(null) }}>
    <DialogContent className="wedding-viewer">
      <DialogTitle>{photo?.title}</DialogTitle>
      <DialogDescription>{photo?.collection} · Photography by {photo?.photographer}</DialogDescription>
      {photo && <img className="viewer-photo" src={photo.url} alt={photo.title} />}
      <div className="viewer-controls">
        <Button variant="outline" size="icon" title="Previous photograph" aria-label="Previous photograph" onClick={() => move(-1)}><ChevronLeft /></Button>
        {photo && <a href={photo.source} target="_blank" rel="noreferrer">View on Unsplash <ArrowUpRight size={16}/></a>}
        <Button variant="outline" size="icon" title="Next photograph" aria-label="Next photograph" onClick={() => move(1)}><ChevronRight /></Button>
      </div>
    </DialogContent>
  </Dialog>
}