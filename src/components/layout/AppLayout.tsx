import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const AppLayout = ({ children, onLogout }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar onLogout={onLogout} />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};