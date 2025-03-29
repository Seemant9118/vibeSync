import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface MoodInputProps {
  onSubmit: (mood: string, resType: string) => void;
  isLoading: boolean;
}

const MoodInput = ({ onSubmit, isLoading }: MoodInputProps) => {
  const [moodText, setMoodText] = useState('');
  const [resType, setResType] = useState(''); // Default: YouTube

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (moodText.trim() && !isLoading) {
      onSubmit(moodText, resType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Switch between YouTube & Spotify */}
      <div className="w-full flex flex-col items-end justify-end gap-1">
        <Label className={`text-xs ${resType === 'youtube' ? 'font-bold' : 'opacity-50'} ${resType === 'spotify' && 'line-through'}`}>YouTube (by default)</Label>
        <div className='flex gap-2 items-center'>
          <Switch
            checked={resType === 'spotify'}
            onCheckedChange={(checked) => setResType(checked ? 'spotify' : '')}
          />
          <Label className={`text-xs ${resType === 'spotify' ? 'font-bold' : 'opacity-50'}`}>Spotify</Label>
        </div>
      </div>

      {/* Mood Input */}
      <Textarea
        className="bg-white/50 dark:bg-black/20 border-white/30 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="E.g., I'm feeling relaxed after a long day at work..."
        value={moodText}
        onChange={(e) => setMoodText(e.target.value)}
        disabled={isLoading}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#EE0979] to-[#FF6A00] hover:bg-gradient-to-l transition-all"
        disabled={isLoading || !moodText.trim()}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <LoadingAnimation /> Analyzing mood...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Get Music Recommendations <ArrowRight size={18} />
          </span>
        )}
      </Button>
    </form>
  );
};

const LoadingAnimation = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-white animate-wave"
          style={{
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default MoodInput;
