import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const testimonials = [
  {
    name: 'Анна Петрова',
    initial: 'А',
    text: 'Заказала разделочную доску из дуба — потрясающее качество! Каждая деталь продумана, дерево обработано идеально. Использую каждый день и очень довольна покупкой.'
  },
  {
    name: 'Дмитрий Соколов',
    initial: 'Д',
    text: 'Купил набор кухонных принадлежностей в подарок жене. Она в восторге! Мастера своего дела видно сразу. Буду заказывать еще — хочу салатницу.'
  },
  {
    name: 'Екатерина Волкова',
    initial: 'Е',
    text: 'Заказывала индивидуальную миску из ореха. Результат превзошёл все ожидания! Очень приятно держать в руках натуральное дерево. Спасибо мастерам!'
  },
  {
    name: 'Михаил Иванов',
    initial: 'М',
    text: 'Отличное качество изделий! Взял несколько подставок под горячее — выглядят стильно, функциональны. Доставка быстрая, упаковка надёжная. Рекомендую!'
  },
  {
    name: 'Ольга Кузнецова',
    initial: 'О',
    text: 'Заказала большую салатницу для семейных ужинов. Невероятно красивая, приятная на ощупь. Теплота дерева создаёт особую атмосферу за столом.'
  },
  {
    name: 'Сергей Морозов',
    initial: 'С',
    text: 'Профессионалы высочайшего уровня! Заказал набор для кухни — каждая вещь уникальна. Чувствуется ручная работа и забота о деталях. Буду советовать друзьям!'
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <h2 className="text-4xl font-serif font-bold text-center mb-4">Отзывы клиентов</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Нам важно мнение каждого клиента
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-serif font-bold text-primary">{testimonial.initial}</span>
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">{testimonial.name}</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
