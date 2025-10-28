import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onSubmit: () => void;
}

export default function CheckoutDialog({ isOpen, onClose, cart, total, onSubmit }: CheckoutDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Оформление заказа</DialogTitle>
          <DialogDescription>
            Заполните форму, и мы свяжемся с вами для подтверждения заказа
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
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
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
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
  );
}
