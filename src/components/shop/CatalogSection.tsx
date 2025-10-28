import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Product } from './types';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  filteredProducts: Product[];
  addToCart: (product: Product) => void;
}

export default function CatalogSection({
  products,
  selectedCategory,
  setSelectedCategory,
  selectedMaterial,
  setSelectedMaterial,
  priceRange,
  setPriceRange,
  filteredProducts,
  addToCart
}: CatalogSectionProps) {
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const materials = ['all', ...Array.from(new Set(products.map(p => p.material)))];

  return (
    <section id="catalog" className="py-20">
      <div className="container">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">Каталог изделий</h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="text-sm font-medium mb-2 block">Категория</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.filter(c => c !== 'all').map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Материал</label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все материалы</SelectItem>
                {materials.filter(m => m !== 'all').map(material => (
                  <SelectItem key={material} value={material}>{material}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-2 block">
              Цена: {priceRange[0]} - {priceRange[1]} ₽
            </label>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-3"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                </DialogContent>
              </Dialog>

              <CardHeader>
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Badge variant="outline">{product.material}</Badge>
                </div>
                <CardTitle className="font-serif">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
                <Button onClick={() => addToCart(product)}>
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
