import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  AlertTriangle,
  Users,
  Activity
} from 'lucide-react';
import { getStatusCounts, getPriorityCounts, mockServiceRequests } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const MetricsCards = () => {
  const statusCounts = getStatusCounts();
  const priorityCounts = getPriorityCounts();
  const totalTickets = mockServiceRequests.length;
  const activeTickets = statusCounts.open + statusCounts.inProgress;

  const metricsData = [
    {
      title: 'Total Tickets',
      value: totalTickets,
      description: 'All service requests',
      icon: Ticket,
      gradient: 'bg-gradient-primary',
      textColor: 'text-primary',
      bgColor: 'bg-primary/5'
    },
    {
      title: 'Active Tickets',
      value: activeTickets,
      description: 'Open & in progress',
      icon: Activity,
      gradient: 'bg-gradient-to-r from-warning to-warning/80',
      textColor: 'text-warning',
      bgColor: 'bg-warning/5'
    },
    {
      title: 'Resolved Today',
      value: statusCounts.resolved,
      description: 'Completed tickets',
      icon: CheckCircle,
      gradient: 'bg-gradient-success',
      textColor: 'text-success',
      bgColor: 'bg-success/5'
    },
    {
      title: 'Critical Priority',
      value: priorityCounts.critical,
      description: 'Needs immediate attention',
      icon: AlertTriangle,
      gradient: 'bg-gradient-to-r from-destructive to-destructive/80',
      textColor: 'text-destructive',
      bgColor: 'bg-destructive/5'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {metricsData.map((metric, index) => (
        <motion.div key={metric.title} variants={cardVariants}>
          <Card className="relative overflow-hidden border-0 bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-4 h-4 ${metric.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <div className={`text-2xl font-bold ${metric.textColor}`}>
                  {metric.value}
                </div>
                <TrendingUp className={`w-4 h-4 ${metric.textColor} opacity-60`} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
            
            {/* Gradient Accent */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${metric.gradient}`} />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};