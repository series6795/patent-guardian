import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Patent, PatentStatus, STATUS_LABELS, CATEGORIES } from '@/types/patent';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  applicationNumber: z.string().min(1, '출원번호를 입력하세요'),
  registrationNumber: z.string().optional(),
  title: z.string().min(1, '발명의 명칭을 입력하세요'),
  inventor: z.string().min(1, '발명자를 입력하세요'),
  applicant: z.string().min(1, '출원인을 입력하세요'),
  applicationDate: z.string().min(1, '출원일을 입력하세요'),
  registrationDate: z.string().optional(),
  expirationDate: z.string().optional(),
  status: z.enum(['pending', 'registered', 'rejected', 'expired']),
  category: z.string().min(1, '분류를 선택하세요'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PatentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Patent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Patent;
  isEdit?: boolean;
}

export function PatentForm({ isOpen, onClose, onSubmit, initialData, isEdit }: PatentFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationNumber: initialData?.applicationNumber || '',
      registrationNumber: initialData?.registrationNumber || '',
      title: initialData?.title || '',
      inventor: initialData?.inventor || '',
      applicant: initialData?.applicant || '',
      applicationDate: initialData?.applicationDate || '',
      registrationDate: initialData?.registrationDate || '',
      expirationDate: initialData?.expirationDate || '',
      status: initialData?.status || 'pending',
      category: initialData?.category || '',
      description: initialData?.description || '',
    },
  });

  const handleSubmit = (data: FormData) => {
    onSubmit(data as Omit<Patent, 'id' | 'createdAt' | 'updatedAt'>);
    toast({
      title: isEdit ? '특허가 수정되었습니다' : '특허가 등록되었습니다',
      description: data.title,
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? '특허 수정' : '특허 등록'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="applicationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>출원번호 *</FormLabel>
                  <FormControl>
                    <Input placeholder="10-2024-0000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>발명의 명칭 *</FormLabel>
                  <FormControl>
                    <Input placeholder="발명의 명칭을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="inventor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>발명자 *</FormLabel>
                    <FormControl>
                      <Input placeholder="발명자 이름" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>출원인 *</FormLabel>
                    <FormControl>
                      <Input placeholder="출원인/회사명" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="applicationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>출원일 *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상태 *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="상태 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>등록번호</FormLabel>
                  <FormControl>
                    <Input placeholder="10-0000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="registrationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>등록일</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>만료일</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>분류 *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="분류 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="발명에 대한 간단한 설명"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button type="submit">
                {isEdit ? '수정' : '등록'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
