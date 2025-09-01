// Mock data for ISP Service Request Dashboard

export interface ServiceRequest {
  id: string;
  ticketId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  issueType: 'Connectivity' | 'Billing' | 'Technical' | 'Hardware' | 'Installation' | 'Maintenance';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: string;
  createdDate: string;
  updatedDate: string;
  description: string;
  resolution?: string;
  actionHistory: {
    id: string;
    action: string;
    user: string;
    timestamp: string;
    notes?: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Technician' | 'Support Agent';
}

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@ispcompany.com', role: 'Admin' },
  { id: '2', name: 'John Smith', email: 'john@ispcompany.com', role: 'Technician' },
  { id: '3', name: 'Sarah Johnson', email: 'sarah@ispcompany.com', role: 'Support Agent' },
  { id: '4', name: 'Mike Davis', email: 'mike@ispcompany.com', role: 'Technician' },
  { id: '5', name: 'Lisa Wilson', email: 'lisa@ispcompany.com', role: 'Support Agent' },
];

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    ticketId: 'SR-2024-001',
    customerId: 'CUST-10001',
    customerName: 'Robert Johnson',
    customerEmail: 'robert.johnson@email.com',
    customerPhone: '(555) 123-4567',
    issueType: 'Connectivity',
    priority: 'High',
    status: 'Open',
    assignedTo: 'John Smith',
    createdDate: '2024-09-01T09:15:00Z',
    updatedDate: '2024-09-01T09:15:00Z',
    description: 'Customer experiencing intermittent internet connectivity issues. Connection drops every few hours.',
    actionHistory: [
      {
        id: '1',
        action: 'Ticket Created',
        user: 'System',
        timestamp: '2024-09-01T09:15:00Z',
        notes: 'Initial ticket creation from customer call'
      }
    ]
  },
  {
    id: '2',
    ticketId: 'SR-2024-002',
    customerId: 'CUST-10002',
    customerName: 'Emily Chen',
    customerEmail: 'emily.chen@email.com',
    customerPhone: '(555) 234-5678',
    issueType: 'Billing',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Sarah Johnson',
    createdDate: '2024-08-31T14:30:00Z',
    updatedDate: '2024-09-01T08:45:00Z',
    description: 'Customer questions about unexpected charges on their monthly bill.',
    actionHistory: [
      {
        id: '1',
        action: 'Ticket Created',
        user: 'System',
        timestamp: '2024-08-31T14:30:00Z'
      },
      {
        id: '2',
        action: 'Assigned to Agent',
        user: 'Admin User',
        timestamp: '2024-09-01T08:30:00Z',
        notes: 'Assigned to billing specialist'
      },
      {
        id: '3',
        action: 'Customer Contacted',
        user: 'Sarah Johnson',
        timestamp: '2024-09-01T08:45:00Z',
        notes: 'Called customer to discuss billing inquiry'
      }
    ]
  },
  {
    id: '3',
    ticketId: 'SR-2024-003',
    customerId: 'CUST-10003',
    customerName: 'Michael Brown',
    customerEmail: 'michael.brown@email.com',
    customerPhone: '(555) 345-6789',
    issueType: 'Hardware',
    priority: 'Critical',
    status: 'In Progress',
    assignedTo: 'Mike Davis',
    createdDate: '2024-08-30T16:20:00Z',
    updatedDate: '2024-09-01T07:30:00Z',
    description: 'Router completely non-functional. Customer has no internet access.',
    actionHistory: [
      {
        id: '1',
        action: 'Ticket Created',
        user: 'System',
        timestamp: '2024-08-30T16:20:00Z'
      },
      {
        id: '2',
        action: 'Escalated to Critical',
        user: 'Admin User',
        timestamp: '2024-08-30T16:25:00Z',
        notes: 'Escalated due to complete service outage'
      },
      {
        id: '3',
        action: 'Technician Dispatched',
        user: 'Mike Davis',
        timestamp: '2024-09-01T07:30:00Z',
        notes: 'Scheduled for on-site visit today at 2 PM'
      }
    ]
  },
  {
    id: '4',
    ticketId: 'SR-2024-004',
    customerId: 'CUST-10004',
    customerName: 'Amanda Davis',
    customerEmail: 'amanda.davis@email.com',
    customerPhone: '(555) 456-7890',
    issueType: 'Installation',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'John Smith',
    createdDate: '2024-08-29T11:00:00Z',
    updatedDate: '2024-08-31T15:45:00Z',
    description: 'New customer requesting fiber internet installation.',
    resolution: 'Fiber installation completed successfully. Customer service activated.',
    actionHistory: [
      {
        id: '1',
        action: 'Ticket Created',
        user: 'System',
        timestamp: '2024-08-29T11:00:00Z'
      },
      {
        id: '2',
        action: 'Installation Scheduled',
        user: 'John Smith',
        timestamp: '2024-08-29T13:15:00Z',
        notes: 'Scheduled installation for Aug 31st'
      },
      {
        id: '3',
        action: 'Installation Completed',
        user: 'John Smith',
        timestamp: '2024-08-31T15:45:00Z',
        notes: 'Fiber connection installed and tested successfully'
      },
      {
        id: '4',
        action: 'Ticket Resolved',
        user: 'John Smith',
        timestamp: '2024-08-31T15:45:00Z'
      }
    ]
  },
  {
    id: '5',
    ticketId: 'SR-2024-005',
    customerId: 'CUST-10005',
    customerName: 'David Wilson',
    customerEmail: 'david.wilson@email.com',
    customerPhone: '(555) 567-8901',
    issueType: 'Technical',
    priority: 'Low',
    status: 'Closed',
    assignedTo: 'Lisa Wilson',
    createdDate: '2024-08-28T10:30:00Z',
    updatedDate: '2024-08-29T14:20:00Z',
    description: 'Customer needs help setting up Wi-Fi password.',
    resolution: 'Provided step-by-step instructions for Wi-Fi setup. Customer confirmed working.',
    actionHistory: [
      {
        id: '1',
        action: 'Ticket Created',
        user: 'System',
        timestamp: '2024-08-28T10:30:00Z'
      },
      {
        id: '2',
        action: 'Remote Support Provided',
        user: 'Lisa Wilson',
        timestamp: '2024-08-28T11:15:00Z',
        notes: 'Walked customer through Wi-Fi setup process'
      },
      {
        id: '3',
        action: 'Ticket Resolved',
        user: 'Lisa Wilson',
        timestamp: '2024-08-28T11:30:00Z'
      },
      {
        id: '4',
        action: 'Ticket Closed',
        user: 'System',
        timestamp: '2024-08-29T14:20:00Z',
        notes: 'Auto-closed after 24 hours with no customer response'
      }
    ]
  },
  {
    id: '6',
    ticketId: 'SR-2024-006',
    customerId: 'CUST-10006',
    customerName: 'Jessica Martinez',
    customerEmail: 'jessica.martinez@email.com',
    customerPhone: '(555) 678-9012',
    issueType: 'Connectivity',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Mike Davis',
    createdDate: '2024-09-01T08:00:00Z',
    updatedDate: '2024-09-01T10:30:00Z',
    description: 'Slow internet speeds, significantly below subscribed package.',
    actionHistory: [
      {
        id: '1',
        action: 'Ticket Created',
        user: 'System',
        timestamp: '2024-09-01T08:00:00Z'
      },
      {
        id: '2',
        action: 'Speed Test Initiated',
        user: 'Mike Davis',
        timestamp: '2024-09-01T10:30:00Z',
        notes: 'Running remote diagnostics on customer connection'
      }
    ]
  },
  {
    id: '7',
    ticketId: 'SR-2024-007',
    customerId: 'CUST-10007',
    customerName: 'Christopher Lee',
    customerEmail: 'christopher.lee@email.com',
    customerPhone: '(555) 789-0123',
    issueType: 'Maintenance',
    priority: 'Low',
    status: 'Open',
    assignedTo: 'John Smith',
    createdDate: '2024-09-01T07:45:00Z',
    updatedDate: '2024-09-01T07:45:00Z',
    description: 'Scheduled maintenance follow-up for recent service upgrade.',
    actionHistory: [
      {
        id: '1',
        action: 'Ticket Created',
        user: 'System',
        timestamp: '2024-09-01T07:45:00Z',
        notes: 'Auto-generated from maintenance schedule'
      }
    ]
  },
  {
    id: '8',
    ticketId: 'SR-2024-008',
    customerId: 'CUST-10008',
    customerName: 'Nicole Thompson',
    customerEmail: 'nicole.thompson@email.com',
    customerPhone: '(555) 890-1234',
    issueType: 'Billing',
    priority: 'Medium',
    status: 'Open',
    assignedTo: 'Sarah Johnson',
    createdDate: '2024-09-01T06:20:00Z',
    updatedDate: '2024-09-01T06:20:00Z',
    description: 'Customer wants to upgrade service package and needs pricing information.',
    actionHistory: [
      {
        id: '1',
        action: 'Ticket Created',
        user: 'System',
        timestamp: '2024-09-01T06:20:00Z'
      }
    ]
  }
];

// Utility functions for data analysis
export const getStatusCounts = () => {
  const counts = mockServiceRequests.reduce((acc, sr) => {
    acc[sr.status] = (acc[sr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    open: counts['Open'] || 0,
    inProgress: counts['In Progress'] || 0,
    resolved: counts['Resolved'] || 0,
    closed: counts['Closed'] || 0,
  };
};

export const getPriorityCounts = () => {
  const counts = mockServiceRequests.reduce((acc, sr) => {
    acc[sr.priority] = (acc[sr.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    low: counts['Low'] || 0,
    medium: counts['Medium'] || 0,
    high: counts['High'] || 0,
    critical: counts['Critical'] || 0,
  };
};

export const getIssueTypeCounts = () => {
  const counts = mockServiceRequests.reduce((acc, sr) => {
    acc[sr.issueType] = (acc[sr.issueType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return counts;
};