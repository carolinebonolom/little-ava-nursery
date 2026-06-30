interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-[oklch(0.95_0.03_200)] to-[oklch(0.97_0.02_150)] py-12 md:py-16">
      <div className="container">
        {breadcrumb && (
          <p className="text-sm text-muted-foreground mb-2">{breadcrumb}</p>
        )}
        <h1 className="heading-2 text-foreground">{title}</h1>
        {subtitle && (
          <p className="body-large text-muted-foreground mt-3 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
