import { cn } from "@/lib/utils";

type BlushPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function BlushPanel({ children, className }: BlushPanelProps) {
  return (
    <aside
      className={cn(
        "rounded border border-oxblood/12 bg-blush/28 p-6 shadow-sm",
        className
      )}
    >
      {children}
    </aside>
  );
}
