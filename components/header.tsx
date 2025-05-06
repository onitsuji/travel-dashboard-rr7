import { cn } from "lib/utils";

type Props = {
  title: string;
  description: string;
};

export default function Header({ title, description }: Props) {
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
    </header>
  );
}
