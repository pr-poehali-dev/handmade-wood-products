import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  material: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Разделочная доска из дуба',
    price: 3500,
    category: 'Кухня',
    material: 'Дуб',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Прочная разделочная доска из массива дуба с натуральным покрытием'
  },
  {
    id: 2,
    name: 'Миска из ореха',
    price: 4200,
    category: 'Посуда',
    material: 'Орех',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Элегантная миска ручной работы из грецкого ореха'
  },
  {
    id: 3,
    name: 'Набор лопаток из бука',
    price: 2800,
    category: 'Кухня',
    material: 'Бук',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Набор из 3 кухонных лопаток из букового дерева'
  },
  {
    id: 4,
    name: 'Подставка под горячее из ясеня',
    price: 1500,
    category: 'Аксессуары',
    material: 'Ясень',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Стильная подставка для защиты поверхности от горячей посуды'
  },
  {
    id: 5,
    name: 'Салатница из дуба',
    price: 5200,
    category: 'Посуда',
    material: 'Дуб',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Большая салатница для семейных обедов'
  },
  {
    id: 6,
    name: 'Деревянная ложка из бука',
    price: 800,
    category: 'Кухня',
    material: 'Бук',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Классическая деревянная ложка для приготовления пищи'
  }
];

const careInstructions = [
  {
    title: 'Мытье',
    description: 'Мойте изделия вручную теплой водой с мягким мылом. Избегайте посудомоечных машин.',
    icon: 'Droplets'
  },
  {
    title: 'Сушка',
    description: 'Тщательно вытирайте после мытья мягкой тканью. Сушите в вертикальном положении.',
    icon: 'Wind'
  },
  {
    title: 'Уход',
    description: 'Регулярно обрабатывайте минеральным маслом для сохранения красоты дерева.',
    icon: 'Sparkles'
  },
  {
    title: 'Хранение',
    description: 'Храните в сухом месте, избегайте прямых солнечных лучей и источников тепла.',
    icon: 'Home'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { toast } = useToast();

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const materials = ['all', ...Array.from(new Set(products.map(p => p.material)))];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const materialMatch = selectedMaterial === 'all' || product.material === selectedMaterial;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && materialMatch && priceMatch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="TreeDeciduous" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold font-serif text-primary">Мастерская дерева</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
            <a href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">Галерея</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Отзывы</a>
            <a href="#care" className="text-sm font-medium hover:text-primary transition-colors">Уход</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-serif">Корзина</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Корзина пуста' : `Товаров: ${cart.length}`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 space-y-4">
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Итого:</span>
                    <span>{total.toLocaleString()} ₽</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setIsCheckoutOpen(true)}>
                    Оформить заказ
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-accent/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
        <div className="container relative z-10 text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
            Изделия ручной работы
            <br />
            из натурального дерева
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Каждое изделие создано с любовью и вниманием к деталям. 
            Экологично, долговечно, уникально.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <a href="#catalog">Смотреть каталог</a>
          </Button>
        </div>
      </section>

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

      <section id="care" className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">Уход за изделиями</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Правильный уход позволит сохранить красоту и долговечность деревянных изделий на долгие годы
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careInstructions.map((instruction, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={instruction.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">{instruction.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{instruction.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">Наши работы</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Каждое изделие — это результат многолетнего опыта и внимания к деталям
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-80">
                  <img 
                    src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg" 
                    alt="Изделие 1" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg" 
                  alt="Изделие 1" 
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-80">
                  <img 
                    src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/085871ca-0ce2-48e4-885a-d2049a1d6971.jpg" 
                    alt="Изделие 2" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/085871ca-0ce2-48e4-885a-d2049a1d6971.jpg" 
                  alt="Изделие 2" 
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-80">
                  <img 
                    src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/2a75ae6c-649f-4867-b9f0-f275452955d6.jpg" 
                    alt="Изделие 3" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/2a75ae6c-649f-4867-b9f0-f275452955d6.jpg" 
                  alt="Изделие 3" 
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-80 md:col-span-2">
                  <img 
                    src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg" 
                    alt="Изделие 4" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg" 
                  alt="Изделие 4" 
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-80">
                  <img 
                    src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/085871ca-0ce2-48e4-885a-d2049a1d6971.jpg" 
                    alt="Изделие 5" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/085871ca-0ce2-48e4-885a-d2049a1d6971.jpg" 
                  alt="Изделие 5" 
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-80">
                  <img 
                    src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/2a75ae6c-649f-4867-b9f0-f275452955d6.jpg" 
                    alt="Изделие 6" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/2a75ae6c-649f-4867-b9f0-f275452955d6.jpg" 
                  alt="Изделие 6" 
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg h-80 md:col-span-2">
                  <img 
                    src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg" 
                    alt="Изделие 7" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg" 
                  alt="Изделие 7" 
                  className="w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="container">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">Отзывы клиентов</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Нам важно мнение каждого клиента
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-serif font-bold text-primary">А</span>
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">Анна Петрова</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Заказала разделочную доску из дуба — потрясающее качество! Каждая деталь продумана, 
                  дерево обработано идеально. Использую каждый день и очень довольна покупкой."
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-serif font-bold text-primary">Д</span>
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">Дмитрий Соколов</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Купил набор кухонных принадлежностей в подарок жене. Она в восторге! 
                  Мастера своего дела видно сразу. Буду заказывать еще — хочу салатницу."
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-serif font-bold text-primary">Е</span>
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">Екатерина Волкова</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Заказывала индивидуальную миску из ореха. Результат превзошёл все ожидания! 
                  Очень приятно держать в руках натуральное дерево. Спасибо мастерам!"
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-serif font-bold text-primary">М</span>
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">Михаил Иванов</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Отличное качество изделий! Взял несколько подставок под горячее — выглядят стильно, 
                  функциональны. Доставка быстрая, упаковка надёжная. Рекомендую!"
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-serif font-bold text-primary">О</span>
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">Ольга Кузнецова</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Заказала большую салатницу для семейных ужинов. Невероятно красивая, 
                  приятная на ощупь. Теплота дерева создаёт особую атмосферу за столом."
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-serif font-bold text-primary">С</span>
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">Сергей Морозов</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Профессионалы высочайшего уровня! Заказал набор для кухни — каждая вещь уникальна. 
                  Чувствуется ручная работа и забота о деталях. Буду советовать друзьям!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">О мастерской</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Мы создаем уникальные изделия из натурального дерева с 2015 года. 
            Каждый предмет изготавливается вручную с использованием традиционных техник 
            и современных подходов к дизайну.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            Мы работаем только с экологически чистыми материалами и безопасными покрытиями. 
            Наша миссия — создавать предметы, которые прослужат поколениям и будут радовать 
            своей естественной красотой.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Изделий создано</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">9</div>
              <div className="text-muted-foreground">Лет опыта</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-secondary/10">
        <div className="container max-w-2xl text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Свяжитесь с нами</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Готовы обсудить индивидуальный заказ или есть вопросы? Мы всегда рады помочь!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default">
              <Icon name="Mail" size={20} className="mr-2" />
              Написать email
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="Phone" size={20} className="mr-2" />
              Позвонить
            </Button>
          </div>
          <div className="mt-12 flex justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Facebook" size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="MessageCircle" size={24} />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Мастерская дерева. Все права защищены.</p>
        </div>
      </footer>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Оформление заказа</DialogTitle>
            <DialogDescription>
              Заполните форму, и мы свяжемся с вами для подтверждения заказа
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            toast({
              title: "Заказ отправлен!",
              description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
            });
            setIsCheckoutOpen(false);
            setCart([]);
          }} className="space-y-6 mt-4">
            <div className="bg-muted/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold mb-3">Ваш заказ:</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ₽</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Итого:</span>
                <span className="text-primary">{total.toLocaleString()} ₽</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Контактная информация</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя *</Label>
                  <Input id="name" placeholder="Иван Иванов" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="example@mail.ru" required />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Доставка</h3>
              <div className="space-y-2">
                <Label htmlFor="delivery">Способ доставки *</Label>
                <Select required>
                  <SelectTrigger id="delivery">
                    <SelectValue placeholder="Выберите способ доставки" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="courier">Курьером по городу (500 ₽)</SelectItem>
                    <SelectItem value="pickup">Самовывоз (бесплатно)</SelectItem>
                    <SelectItem value="post">Почта России</SelectItem>
                    <SelectItem value="cdek">СДЭК</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки *</Label>
                <Input id="address" placeholder="Улица, дом, квартира" required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Город *</Label>
                  <Input id="city" placeholder="Москва" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">Индекс</Label>
                  <Input id="postal" placeholder="123456" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Дополнительная информация</h3>
              <div className="space-y-2">
                <Label htmlFor="payment">Способ оплаты *</Label>
                <Select required>
                  <SelectTrigger id="payment">
                    <SelectValue placeholder="Выберите способ оплаты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Картой онлайн</SelectItem>
                    <SelectItem value="cash">Наличными при получении</SelectItem>
                    <SelectItem value="transfer">Банковский перевод</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea 
                  id="comment" 
                  placeholder="Укажите желаемое время доставки или другие пожелания"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsCheckoutOpen(false)}>
                Отмена
              </Button>
              <Button type="submit" className="flex-1">
                <Icon name="Check" size={20} className="mr-2" />
                Подтвердить заказ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}