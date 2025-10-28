import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/shop/Header';
import HeroSection from '@/components/shop/HeroSection';
import CatalogSection from '@/components/shop/CatalogSection';
import GallerySection from '@/components/shop/GallerySection';
import TestimonialsSection from '@/components/shop/TestimonialsSection';
import CareSection from '@/components/shop/CareSection';
import AboutSection from '@/components/shop/AboutSection';
import ContactSection from '@/components/shop/ContactSection';
import CheckoutDialog from '@/components/shop/CheckoutDialog';
import { CartItem, Product } from '@/components/shop/types';
import { products, careInstructions } from '@/components/shop/data';

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

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

  const handleCheckout = () => {
    toast({
      title: "Заказ отправлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
    });
    setIsCheckoutOpen(false);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cart={cart}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        total={total}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <HeroSection />

      <CatalogSection
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        filteredProducts={filteredProducts}
        addToCart={addToCart}
      />

      <GallerySection />

      <TestimonialsSection />

      <CareSection instructions={careInstructions} />

      <AboutSection />

      <ContactSection />

      <footer className="py-8 border-t">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Мастерская дерева. Все права защищены.</p>
        </div>
      </footer>

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={total}
        onSubmit={handleCheckout}
      />
    </div>
  );
}
