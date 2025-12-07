import { Calendar, User, Building2, Tag, FileText, Hash, Trash2, Edit2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Patent, STATUS_LABELS, PatentStatus } from '@/types/patent';
import { useState } from 'react';
import { PatentForm } from './PatentForm';

interface PatentDialogProps {
  patent: Patent | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (patent: Patent) => void;
  onDelete: (id: string) => void;
}

export function PatentDialog({ patent, isOpen, onClose, onUpdate, onDelete }: PatentDialogProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!patent) return null;

  const handleDelete = () => {
    if (confirm('정말로 이 특허를 삭제하시겠습니까?')) {
      onDelete(patent.id);
      onClose();
    }
  };

  const handleUpdate = (data: Omit<Patent, 'id' | 'createdAt' | 'updatedAt'>) => {
    onUpdate({
      ...patent,
      ...data,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <PatentForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleUpdate}
        initialData={patent}
        isEdit
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg animate-scale-in">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogDescription className="text-xs font-medium text-muted-foreground mb-1">
                {patent.applicationNumber}
              </DialogDescription>
              <DialogTitle className="text-xl leading-tight">{patent.title}</DialogTitle>
            </div>
            <Badge variant={patent.status as PatentStatus} className="shrink-0">
              {STATUS_LABELS[patent.status]}
            </Badge>
          </div>
        </DialogHeader>

        <Separator />

        <div className="grid gap-4 py-2">
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">발명자</p>
                <p className="font-medium">{patent.inventor}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">출원인</p>
                <p className="font-medium">{patent.applicant}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">출원일</p>
                <p className="font-medium">{patent.applicationDate}</p>
              </div>
            </div>

            {patent.registrationNumber && (
              <div className="flex items-center gap-3">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">등록번호</p>
                  <p className="font-medium">{patent.registrationNumber}</p>
                </div>
              </div>
            )}

            {patent.registrationDate && (
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">등록일</p>
                  <p className="font-medium">{patent.registrationDate}</p>
                </div>
              </div>
            )}

            {patent.expirationDate && (
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">만료일</p>
                  <p className="font-medium">{patent.expirationDate}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">분류</p>
                <p className="font-medium">{patent.category}</p>
              </div>
            </div>

            {patent.description && (
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">설명</p>
                  <p className="font-medium">{patent.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex justify-between">
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            삭제
          </Button>
          <Button size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4" />
            수정
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
