import ConnectionsGame from "@/components/connections/game";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function Connections() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Toaster
        position="top-center"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        richColors
        expand={false}
        visibleToasts={1}
        closeButton
        offset="16px"
        gap={8}
        toastOptions={{
          duration: 3000,
          classNames: {
            toast: "bg-card border border-border rounded-lg shadow-sm",
            title: "text-card-foreground font-medium",
            description: "text-card-foreground/90",
            actionButton: "bg-primary text-primary-foreground",
            cancelButton: "bg-muted text-muted-foreground",
            closeButton: "text-muted-foreground hover:text-foreground",
            info: "bg-card border-l-4 border-l-blue-500",
            success: "bg-card border-l-4 border-l-green-500",
            warning: "bg-card border-l-4 border-l-yellow-500",
            error: "bg-card border-l-4 border-l-red-500",
          },
          style: {
            padding: "12px 16px",
            maxWidth: "320px",
          },
        }}
      />
      <ConnectionsGame />
    </div>
  );
}
