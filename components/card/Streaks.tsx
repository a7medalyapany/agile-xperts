import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StreaksProps {
  userRole: string;
  strakPoints: number;
}

const Streaks: FC<StreaksProps> = ({ userRole, strakPoints }) => {
  const role = userRole!.charAt(0).toUpperCase() + userRole.slice(1);
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <div className="w-fit rounded-lg bg-primary px-4">
          <p className="text-sm font-bold text-primary-foreground">{role}</p>
        </div>
        <CardDescription>Streak Points</CardDescription>
        <CardTitle className="max-w-lg text-balance leading-relaxed">
          {strakPoints}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          Complete more tasks to level up!
        </p>
      </CardContent>
      <CardFooter>
        <Progress
          className="h-1 rounded-sm"
          value={30}
          aria-label="30% increase"
        />
      </CardFooter>
    </Card>
  );
};

export default Streaks;
