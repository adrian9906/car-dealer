interface HeadingProps {
  children?: React.ReactNode;
  heading: string;
  subtext?: string;
  className?: string;
}

export default function HeadingText({
  children,
  subtext,
  heading,
  className,
}: HeadingProps) {
  return (
    <div
      className={`flex items-center justify-between space-y-2 px-2 ${className}`}
    >
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold lg:text-4xl">{heading}</h1>
        {subtext && (
          <h2 className="font-light text-muted-foreground lg:text-lg">
            {subtext}
          </h2>
        )}
      </div>
      {children}
    </div>
  );
}
