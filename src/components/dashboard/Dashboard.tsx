import { FileCheck, FileClock, FileX, FileWarning } from 'lucide-react';
import { StatCard } from './StatCard';
import { Patent } from '@/types/patent';

interface DashboardProps {
  patents: Patent[];
}

export function Dashboard({ patents }: DashboardProps) {
  const stats = {
    total: patents.length,
    pending: patents.filter(p => p.status === 'pending').length,
    registered: patents.filter(p => p.status === 'registered').length,
    rejected: patents.filter(p => p.status === 'rejected').length,
    expired: patents.filter(p => p.status === 'expired').length,
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">대시보드</h2>
        <p className="text-sm text-muted-foreground">특허 현황을 한눈에 확인하세요</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="출원중"
          value={stats.pending}
          icon={FileClock}
          variant="warning"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="등록완료"
          value={stats.registered}
          icon={FileCheck}
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="거절"
          value={stats.rejected}
          icon={FileX}
          variant="destructive"
        />
        <StatCard
          title="만료"
          value={stats.expired}
          icon={FileWarning}
          variant="default"
        />
      </div>
    </section>
  );
}
