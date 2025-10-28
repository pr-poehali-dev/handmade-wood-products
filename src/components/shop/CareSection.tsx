import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CareInstruction {
  title: string;
  description: string;
  icon: string;
}

interface CareSectionProps {
  instructions: CareInstruction[];
}

export default function CareSection({ instructions }: CareSectionProps) {
  return (
    <section id="care" className="py-20 bg-muted/30">
      <div className="container">
        <h2 className="text-4xl font-serif font-bold text-center mb-4">Уход за изделиями</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Правильный уход позволит сохранить красоту и долговечность деревянных изделий на долгие годы
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructions.map((instruction, index) => (
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
  );
}
