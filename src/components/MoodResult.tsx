
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MoodResultProps {
  mood: string;
  description?: string;
}

const MoodResult = ({ mood }: MoodResultProps) => {
  return (
    <Card className="w-full p-4 glassmorphism">
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium opacity-80">Your mood seems to be</h3>
        <Badge className="px-3 py-1 text-lg font-semibold text-white bg-gradient-to-r from-[#EE0979] to-[#FF6A00] hover:bg-gradient-to-l">
          {mood}
        </Badge>
      </div>
    </Card>
  );
};

export default MoodResult;
