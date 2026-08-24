import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Fil d'Ariane" data-testid="breadcrumbs" className="mb-8">
    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-charcoal/55">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-charcoal/35" />}
          {item.to ? (
            <Link to={item.to} data-testid={`breadcrumb-link-${i}`} className="link-underline hover:text-charcoal">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="font-semibold text-charcoal/80">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
