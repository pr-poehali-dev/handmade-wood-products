import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ContactSection() {
  return (
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
  );
}
