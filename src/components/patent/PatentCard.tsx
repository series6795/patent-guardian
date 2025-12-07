import { Calendar, User, Building2, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Patent, STATUS_LABELS, PatentStatus } from '@/types/patent';
import { cn } from '@/lib/utils';

interface PatentCardProps {
  patent: Patent;
  onClick: (patent: Patent) => void;
}

export function PatentCard({ patent, onClick }: PatentCardProps) {
  return (
    <Card 
      className="cursor-pointer animate-slide-up transition-all duration-200 hover:-translate-y-1"
      onClick={() => onClick(patent)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {patent.applicationNumber}
            </p>
            <h3 className="font-semibold leading-tight line-clamp-2">
              {patent.title}
            </h3>
          </div>
          <Badge variant={patent.status as PatentStatus}>
            {STATUS_LABELS[patent.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{patent.inventor}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{patent.applicant}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{patent.applicationDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-3.5 w-3.5 shrink-0" />
            <span>{patent.category}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
