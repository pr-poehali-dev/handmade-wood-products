import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
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
  );
}
