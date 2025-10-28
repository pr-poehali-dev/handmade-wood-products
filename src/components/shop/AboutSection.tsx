export default function AboutSection() {
  return (
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
  );
}
