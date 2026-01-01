import { useAuth } from "@/store/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({
  children,
} : Readonly<{
  children: ReactNode
}>) {
  const { isAuthenticated, _hasHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router, _hasHydrated]);

  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}