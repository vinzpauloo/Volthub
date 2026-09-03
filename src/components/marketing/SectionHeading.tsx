import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string | ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  taglineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  taglineClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) => {
  const alignment =
    align === "center"
      ? "text-center mx-auto max-w-4xl"
      : "text-left max-w-4xl";

  return (
    <div className={cn("space-y-4", alignment)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-sm uppercase tracking-[0.35em] text-emerald-700 font-semibold",
            taglineClassName
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "text-4xl font-bold gradient-text leading-tight",
          titleClassName
        )}
      >
        {title}
      </Heading>
      {description ? (
        <div className={cn("text-lg text-gray-600", descriptionClassName)}>
          {description}
        </div>
      ) : null}
    </div>
  );
};

export default SectionHeading;
