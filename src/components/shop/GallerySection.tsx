import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const galleryImages = [
  {
    id: 1,
    url: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    alt: 'Изделие 1',
    colSpan: 1
  },
  {
    id: 2,
    url: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/085871ca-0ce2-48e4-885a-d2049a1d6971.jpg',
    alt: 'Изделие 2',
    colSpan: 1
  },
  {
    id: 3,
    url: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/2a75ae6c-649f-4867-b9f0-f275452955d6.jpg',
    alt: 'Изделие 3',
    colSpan: 1
  },
  {
    id: 4,
    url: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    alt: 'Изделие 4',
    colSpan: 2
  },
  {
    id: 5,
    url: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/085871ca-0ce2-48e4-885a-d2049a1d6971.jpg',
    alt: 'Изделие 5',
    colSpan: 1
  },
  {
    id: 6,
    url: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/2a75ae6c-649f-4867-b9f0-f275452955d6.jpg',
    alt: 'Изделие 6',
    colSpan: 1
  },
  {
    id: 7,
    url: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    alt: 'Изделие 7',
    colSpan: 2
  }
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container">
        <h2 className="text-4xl font-serif font-bold text-center mb-4">Наши работы</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Каждое изделие — это результат многолетнего опыта и внимания к деталям
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div className={`relative group cursor-pointer overflow-hidden rounded-lg h-80 ${image.colSpan === 2 ? 'md:col-span-2' : ''}`}>
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
