import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { cn } from "lib/utils";
import { Link } from "react-router";

type Props = {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
};

export default function Header({ title, description, ctaText, ctaUrl }: Props) {
  return (
    <header className="header">
      <article>
        <h1 className={cn("text-dark-100 text-xl md:text-2xl font-semibold")}>
          {title}
        </h1>
        <p className={cn("text-gray-100 font-normal text-sm md:text-lg")}>
          {description}
        </p>
      </article>
      {ctaText && ctaUrl && (
        <Link to={ctaUrl}>
          <ButtonComponent
            type="button"
            className="button-class !h-11 !w-full md:w-[240px]"
          >
            <img
              src="/assets/icons/plus.svg"
              alt="plus icon"
              className="size-5"
            />
            <span className="p-16-semibold text-white">{ctaText}</span>
          </ButtonComponent>
        </Link>
      )}
    </header>
  );
}
