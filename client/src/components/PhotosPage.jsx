import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
 
// Every image dropped into src/assets/gallery shows up here automatically.
const files = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}',
  { eager: true, import: 'default' },
);
 
const photos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    // "arathi-basin_win.jpg" becomes "arathi basin win"
    caption: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
  }));
 
export default function PhotosPage() {
  const [open, setOpen] = useState(null); // index of the photo being viewed
 
  const step = (d) => setOpen((i) => (i + d + photos.length) % photos.length);
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };
 
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>Photos</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Screenshots and moments from the guild. Select a photo to see it larger.
      </Typography>
 
      {photos.length === 0 && (
        <Typography color="text.secondary">
          No photos yet. Officers can add images to <code>client/src/assets/gallery</code>.
        </Typography>
      )}
 
      <Box sx={{ columnWidth: 240, columnGap: 12 }}>
        {photos.map((p, i) => (
          <Box key={p.src} component="button" type="button" onClick={() => setOpen(i)}
            aria-label={`Open photo: ${p.caption}`}
            sx={{ display: 'block', width: '100%', p: 0, mb: '12px', border: 0, bgcolor: 'transparent',
              cursor: 'zoom-in', breakInside: 'avoid', borderRadius: 1, overflow: 'hidden',
              '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main' } }}>
            <Box component="img" src={p.src} alt={p.caption} loading="lazy" sx={{ width: '100%', display: 'block' }} />
          </Box>
        ))}
      </Box>
 
      <Dialog open={open !== null} onClose={() => setOpen(null)} maxWidth="lg" onKeyDown={onKeyDown}>
        {open !== null && (
          <>
            <DialogContent sx={{ textAlign: 'center' }}>
              <Box component="img" src={photos[open].src} alt={photos[open].caption}
                sx={{ maxWidth: '100%', maxHeight: '75vh' }} />
              <Typography sx={{ mt: 1, textTransform: 'capitalize' }}>{photos[open].caption}</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
              <Button onClick={() => step(-1)} disabled={photos.length < 2}>Previous</Button>
              <Typography variant="body2" color="text.secondary">{open + 1} of {photos.length}</Typography>
              <Button onClick={() => step(1)} disabled={photos.length < 2}>Next</Button>
              <Button onClick={() => setOpen(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
 
