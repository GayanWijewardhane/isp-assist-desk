import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Filter,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { ServiceRequest, mockServiceRequests } from '@/data/mockData';

interface ServiceRequestsTableProps {
  onTicketClick: (ticket: ServiceRequest) => void;
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

const statusIcons = {
  'Open': AlertCircle,
  'In Progress': Clock,
  'Resolved': CheckCircle,
  'Closed': XCircle
};

export const ServiceRequestsTable = ({ onTicketClick }: ServiceRequestsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [issueTypeFilter, setIssueTypeFilter] = useState<string>('all');

  const filteredRequests = mockServiceRequests.filter(request => {
    const matchesSearch = 
      request.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    const matchesIssueType = issueTypeFilter === 'all' || request.issueType === issueTypeFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesIssueType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="border-0 bg-gradient-card shadow-card">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <CardTitle>Service Requests</CardTitle>
            <CardDescription>
              Manage and track all customer service requests
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-gradient-primary hover:shadow-hover">
              <Filter className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tickets, customer ID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={issueTypeFilter} onValueChange={setIssueTypeFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Issue Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Connectivity">Connectivity</SelectItem>
              <SelectItem value="Billing">Billing</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Hardware">Hardware</SelectItem>
              <SelectItem value="Installation">Installation</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Ticket ID</TableHead>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Issue Type</TableHead>
                <TableHead className="font-semibold">Priority</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Assigned To</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request, index) => {
                const StatusIcon = statusIcons[request.status];
                return (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => onTicketClick(request)}
                  >
                    <TableCell className="font-medium text-primary">
                      {request.ticketId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.customerName}</div>
                        <div className="text-sm text-muted-foreground">{request.customerId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {request.issueType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityColors[request.priority]}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[request.status]} flex items-center gap-1 w-fit`}>
                        <StatusIcon className="w-3 h-3" />
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.assignedTo}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(request.createdDate)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTicketClick(request);
                        }}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No service requests match your filters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};