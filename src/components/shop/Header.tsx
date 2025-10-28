import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';

interface HeaderProps {
  cart: CartItem[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  total: number;
  onCheckout: () => void;
}

export default function Header({
  cart,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  updateQuantity,
  removeFromCart,
  total,
  onCheckout
}: HeaderProps) {
  return (
    <>
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

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Icon name="Menu" size={24} />
            </Button>

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
                    <Button className="w-full" size="lg" onClick={onCheckout}>
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px]">
          <SheetHeader>
            <SheetTitle className="font-serif flex items-center gap-2">
              <Icon name="TreeDeciduous" size={24} className="text-primary" />
              Меню
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            <a 
              href="#catalog" 
              className="text-lg font-medium hover:text-primary transition-colors py-2 flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="ShoppingBag" size={20} />
              Каталог
            </a>
            <Separator />
            <a 
              href="#gallery" 
              className="text-lg font-medium hover:text-primary transition-colors py-2 flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="Image" size={20} />
              Галерея
            </a>
            <Separator />
            <a 
              href="#testimonials" 
              className="text-lg font-medium hover:text-primary transition-colors py-2 flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="MessageSquare" size={20} />
              Отзывы
            </a>
            <Separator />
            <a 
              href="#care" 
              className="text-lg font-medium hover:text-primary transition-colors py-2 flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="Sparkles" size={20} />
              Уход
            </a>
            <Separator />
            <a 
              href="#contact" 
              className="text-lg font-medium hover:text-primary transition-colors py-2 flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="Phone" size={20} />
              Контакты
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
