import { useState } from 'react';
import { motion } from 'framer-motion';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { StatusChart } from '@/components/dashboard/StatusChart';
import { ServiceRequestsTable } from '@/components/dashboard/ServiceRequestsTable';
import { TicketDetail } from '@/components/dashboard/TicketDetail';
import { ServiceRequest } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Plus, Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const Dashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState<ServiceRequest | null>(null);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);

  const handleTicketClick = (ticket: ServiceRequest) => {
    setSelectedTicket(ticket);
    setIsTicketDetailOpen(true);
  };

  const handleTicketUpdate = (ticketId: string, action: string) => {
    // In a real app, this would update the ticket in the database
    console.log(`Updating ticket ${ticketId} with action: ${action}`);
    setIsTicketDetailOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-6">
          <div className="flex items-center space-x-4 flex-1">
            <SidebarTrigger className="h-8 w-8" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">Service Request Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Quick search..."
                className="w-64 pl-8"
              />
            </div>
            
            <Button variant="outline" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            
            <Button className="bg-gradient-primary hover:shadow-hover">
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Welcome back, Admin
              </h2>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your service requests today.
              </p>
            </div>
          </div>

          {/* Metrics Overview */}
          <MetricsCards />

          {/* Charts Section */}
          <StatusChart />

          {/* Recent Service Requests */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Recent Service Requests</h3>
            <ServiceRequestsTable onTicketClick={handleTicketClick} />
          </div>
        </motion.div>
      </main>

      {/* Ticket Detail Modal */}
      <TicketDetail
        ticket={selectedTicket}
        isOpen={isTicketDetailOpen}
        onClose={() => setIsTicketDetailOpen(false)}
        onUpdate={handleTicketUpdate}
      />
    </div>
  );
};