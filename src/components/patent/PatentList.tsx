import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PatentCard } from './PatentCard';
import { PatentDialog } from './PatentDialog';
import { PatentForm } from './PatentForm';
import { Patent, PatentStatus, STATUS_LABELS, CATEGORIES } from '@/types/patent';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PatentListProps {
  patents: Patent[];
  searchQuery: string;
  onAddPatent: (patent: Omit<Patent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdatePatent: (patent: Patent) => void;
  onDeletePatent: (id: string) => void;
}

export function PatentList({
  patents,
  searchQuery,
  onAddPatent,
  onUpdatePatent,
  onDeletePatent,
}: PatentListProps) {
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredPatents = patents.filter((patent) => {
    const matchesSearch =
      patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.inventor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.applicant.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || patent.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || patent.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">특허 목록</h2>
          <p className="text-sm text-muted-foreground">
            총 {filteredPatents.length}건의 특허
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" />
          특허 등록
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 bg-card">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-36 bg-card">
            <SelectValue placeholder="분류" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 분류</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredPatents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 py-16">
          <p className="text-muted-foreground">검색 결과가 없습니다</p>
          <Button variant="link" onClick={() => {
            setStatusFilter('all');
            setCategoryFilter('all');
          }}>
            필터 초기화
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPatents.map((patent, index) => (
            <div key={patent.id} style={{ animationDelay: `${index * 50}ms` }}>
              <PatentCard patent={patent} onClick={setSelectedPatent} />
            </div>
          ))}
        </div>
      )}

      <PatentDialog
        patent={selectedPatent}
        isOpen={!!selectedPatent}
        onClose={() => setSelectedPatent(null)}
        onUpdate={onUpdatePatent}
        onDelete={onDeletePatent}
      />

      <PatentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={onAddPatent}
      />
    </section>
  );
}
