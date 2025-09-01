import { useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceRequestsTable } from '@/components/dashboard/ServiceRequestsTable';
import { TicketDetail } from '@/components/dashboard/TicketDetail';
import { ServiceRequest } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Plus, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const ServiceRequests = () => {
  const [selectedTicket, setSelectedTicket] = useState<ServiceRequest | null>(null);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);

  const handleTicketClick = (ticket: ServiceRequest) => {
    setSelectedTicket(ticket);
    setIsTicketDetailOpen(true);
  };

  const handleTicketUpdate = (ticketId: string, action: string) => {
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
              <h1 className="text-lg font-semibold text-foreground">Service Requests</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="w-64 pl-8"
              />
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
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
          className="max-w-7xl mx-auto space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                All Service Requests
              </h2>
              <p className="text-muted-foreground mt-1">
                Manage and track all customer service requests.
              </p>
            </div>
          </div>

          <ServiceRequestsTable onTicketClick={handleTicketClick} />
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