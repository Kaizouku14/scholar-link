import ModeToggle from "@/components/theme/mode-toggler";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfileSetup = () => {
  return (
    <Card className="z-100 w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          Welcome to Scholar
          <span className="text-primary">Link</span>
          <span className="ml-1">🎓</span>
        </CardTitle>
        <CardDescription>
          Complete your student profile to get started with our platform!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ModeToggle />
      </CardContent>
      <CardFooter className="flex justify-end">
        {/* Action buttons (e.g., Continue, Next) */}
      </CardFooter>
    </Card>
  );
};

export default ProfileSetup;
