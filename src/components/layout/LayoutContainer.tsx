import { cn } from "@/lib/utils";

export default function LayoutContainer({
  children,
  className,
  outerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  outerClassName?: string;
}) {
  return (
    <div className={cn("w-full", outerClassName)}>
      <div className={cn("max-w-[1600px]  mx-auto px-4", className)}>
        {children}
      </div>
    </div>
  );
}
