import HistoryDrawer, { HistoryItem } from '@/components/HistoryDrawer';
import MoodInput from '@/components/MoodInput';
import MoodResult from '@/components/MoodResult';
import ResetButton from '@/components/ResetButton';
import SongList from '@/components/SongList';
import ThemeToggle from '@/components/ThemeToggle';
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { analyzeText } from '../services/musicServices.js';

const Index = () => {
  const { toast } = useToast();
  const [detectedMood, setDetectedMood] = useState('');
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(history));
  }, [history]);

  const analyzeTextMutation = useMutation({
    mutationKey: ['analyze_text'],
    mutationFn: ({ text, resType }: { text: string; resType: string }) => analyzeText(resType, { text }),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (res, variables) => {
      console.log("Success:", res);
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { mood, playlists } = (res as { data: { mood: string; playlists: [] } })?.data;

      setDetectedMood(mood);
      setSongs(playlists);
      setIsLoading(false);

      const historyItem: HistoryItem = {
        id: uuidv4(),
        query: variables.text,
        mood: mood || 'Unknown',
        songs: playlists, // ✅ Store full song list in history
        timestamp: new Date().toISOString(),
      };

      setHistory(prev => [historyItem, ...prev]);
    },
    onError: () => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to analyze your mood. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleMoodSubmit = async (text: string, resType: string) => {
    analyzeTextMutation.mutate({ text, resType });
  };


  const handleReset = () => {
    setDetectedMood('');
    setSongs([]);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setDetectedMood(item.mood);
    setSongs(item.songs || []); // ✅ Restore songs from history
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('moodHistory');
    toast({
      title: "Success",
      description: "Your history has been cleared.",
    });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between py-8 px-4 overflow-hidden">
      <ThemeToggle />
      <HistoryDrawer
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        clearHistory={clearHistory}
      />

      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <div className='flex items-center gap-1'>
          <img src="/Icon.png" alt='icon-png' className='w-10' />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 p-2 text-center bg-gradient-to-r text-white bg-clip-text text-transparent">
            Vibe Sync
          </h1>
        </div>
        <p className="text-lg opacity-70 mb-8 text-center">Find the perfect soundtrack for your mood</p>

        <div className="w-full max-w-lg flex flex-col gap-4">
          {!detectedMood && (
            <MoodInput
              onSubmit={handleMoodSubmit}
              isLoading={isLoading}
            />
          )}

          {detectedMood && (
            <>
              <MoodResult mood={detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1)} />

              <SongList songs={songs} />

              <div className="flex justify-center mt-2">
                <ResetButton onReset={handleReset} />
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="text-sm opacity-50 text-center mt-2">
        © {new Date().getFullYear()} Vibe Sync • AI-Powered Music Recommendations by Team Ragnarok
      </footer>
    </div>
  );
};

export default Index;
