
import {
  Drawer,
  DrawerContent,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { History, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export interface HistoryItem {
  id: string;
  query: string;
  mood: string;
  songs: Array<string>;
  timestamp: string;
}

interface HistoryDrawerProps {
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  clearHistory: () => void;
}

const HistoryDrawer = ({ history, onSelectHistoryItem, clearHistory }: HistoryDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectItem = (item: HistoryItem) => {
    onSelectHistoryItem(item);
    setIsOpen(false);
  };

  // Generate background gradient based on mood
  const getMoodGradientClass = (mood: string) => {
    const normalizedMood = mood.toLowerCase();
    switch (normalizedMood) {
      case 'happy':
        return 'from-amber-300/40 to-orange-200/40 dark:from-amber-400/20 dark:to-orange-300/20';
      case 'relaxed':
        return 'from-sky-300/40 to-blue-200/40 dark:from-sky-400/20 dark:to-blue-300/20';
      case 'romantic':
        return 'from-pink-300/40 to-rose-200/40 dark:from-pink-400/20 dark:to-rose-300/20';
      case 'energetic':
        return 'from-lime-300/40 to-emerald-200/40 dark:from-lime-400/20 dark:to-emerald-300/20';
      case 'melancholic':
        return 'from-indigo-300/40 to-violet-200/40 dark:from-indigo-400/20 dark:to-violet-300/20';
      default:
        return 'from-white/30 to-white/20 dark:from-white/15 dark:to-white/10';
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="bg-white/30 dark:bg-black/20 hover:bg-white/50 dark:hover:bg-black/30 absolute top-4 right-4"
        onClick={() => setIsOpen(true)}
      >
        <History size={18} />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="glassmorphism border-t border-white/30 dark:border-white/10">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <ArrowLeft size={18} />
              </Button>
              <h2 className="text-xl font-semibold">Your Mood History</h2>
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                Clear
              </Button>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-8 opacity-70">
                <p>No mood history yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg bg-gradient-to-r ${getMoodGradientClass(item.mood)} backdrop-blur-sm hover:brightness-110 cursor-pointer transition-all`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium truncate max-w-[200px]">{item.query}</p>
                        <p className="text-sm opacity-80">Mood: {item.mood}</p>
                      </div>
                      <span className="text-xs opacity-60">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HistoryDrawer;
