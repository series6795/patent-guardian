import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { PatentList } from '@/components/patent/PatentList';
import { samplePatents } from '@/data/samplePatents';
import { Patent } from '@/types/patent';

const Index = () => {
  const [patents, setPatents] = useState<Patent[]>(samplePatents);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddPatent = (data: Omit<Patent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatent: Patent = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPatents((prev) => [newPatent, ...prev]);
  };

  const handleUpdatePatent = (updatedPatent: Patent) => {
    setPatents((prev) =>
      prev.map((p) => (p.id === updatedPatent.id ? updatedPatent : p))
    );
  };

  const handleDeletePatent = (id: string) => {
    setPatents((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container py-8 space-y-8">
        <Dashboard patents={patents} />
        <PatentList
          patents={patents}
          searchQuery={searchQuery}
          onAddPatent={handleAddPatent}
          onUpdatePatent={handleUpdatePatent}
          onDeletePatent={handleDeletePatent}
        />
      </main>
    </div>
  );
};

export default Index;
