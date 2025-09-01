import { motion } from 'framer-motion';
import { ServiceRequest } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  UserCheck,
  MessageSquare
} from 'lucide-react';

interface TicketDetailProps {
  ticket: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (ticketId: string, action: string) => void;
}

const priorityColors = {
  Low: 'bg-priority-low text-white',
  Medium: 'bg-priority-medium text-white',
  High: 'bg-priority-high text-white',
  Critical: 'bg-priority-critical text-white animate-pulse'
};

const statusColors = {
  'Open': 'bg-status-open text-white',
  'In Progress': 'bg-status-in-progress text-white',
  'Resolved': 'bg-status-resolved text-white',
  'Closed': 'bg-status-closed text-white'
};

export const TicketDetail = ({ ticket, isOpen, onClose, onUpdate }: TicketDetailProps) => {
  if (!ticket) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatActionDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAction = (action: string) => {
    onUpdate(ticket.id, action);
    // In a real app, this would trigger an API call
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold text-primary">
                {ticket.ticketId}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Service Request Details
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={priorityColors[ticket.priority]}>
                {ticket.priority}
              </Badge>
              <Badge className={statusColors[ticket.status]}>
                {ticket.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Issue Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <Badge variant="outline" className="ml-2">{ticket.issueType}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground block mb-2">Description</label>
                    <p className="text-foreground leading-relaxed">{ticket.description}</p>
                  </div>
                  {ticket.resolution && (
                    <div>
                      <label className="text-sm font-medium text-success block mb-2">Resolution</label>
                      <p className="text-foreground leading-relaxed bg-success/5 p-3 rounded-lg border border-success/20">
                        {ticket.resolution}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Action History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticket.actionHistory.map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{action.action}</p>
                          <span className="text-sm text-muted-foreground">
                            {formatActionDate(action.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">by {action.user}</p>
                        {action.notes && (
                          <p className="text-sm text-foreground mt-2 bg-background/50 p-2 rounded border">
                            {action.notes}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Customer Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{ticket.customerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Customer ID</label>
                  <p className="font-mono text-sm">{ticket.customerId}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${ticket.customerEmail}`} className="text-primary hover:underline text-sm">
                    {ticket.customerEmail}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${ticket.customerPhone}`} className="text-primary hover:underline text-sm">
                    {ticket.customerPhone}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Ticket Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned To</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <UserCheck className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{ticket.assignedTo}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm">{formatDate(ticket.createdDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="text-sm">{formatDate(ticket.updatedDate)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {ticket.status === 'Open' && (
                  <Button 
                    onClick={() => handleAction('start')}
                    className="w-full bg-gradient-to-r from-warning to-warning/80 hover:shadow-hover"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Start Working
                  </Button>
                )}
                
                {ticket.status === 'In Progress' && (
                  <Button 
                    onClick={() => handleAction('resolve')}
                    className="w-full bg-gradient-success hover:shadow-hover"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Resolved
                  </Button>
                )}

                {(ticket.status === 'Open' || ticket.status === 'In Progress') && (
                  <Button 
                    variant="outline"
                    onClick={() => handleAction('escalate')}
                    className="w-full border-destructive text-destructive hover:bg-destructive/5"
                  >
                    <ArrowUp className="w-4 h-4 mr-2" />
                    Escalate
                  </Button>
                )}

                <Button 
                  variant="outline"
                  onClick={() => handleAction('reassign')}
                  className="w-full"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Reassign
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};