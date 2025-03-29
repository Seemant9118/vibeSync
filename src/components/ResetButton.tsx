
import { Button } from "@/components/ui/button";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton = ({ onReset }: ResetButtonProps) => {
  return (
    <Button 
      onClick={onReset} 
      variant="outline" 
      className="bg-white/30 dark:bg-black/20 hover:bg-white/50 dark:hover:bg-black/30"
    >
      Try Another Mood
    </Button>
  );
};

export default ResetButton;
