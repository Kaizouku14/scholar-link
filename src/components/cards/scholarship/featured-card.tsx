import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { CalendarDays, UsersRound, MapPin, FileText } from "lucide-react";
import { PageRoutes } from "@/constants/page-routes";
import Link from "next/link";
import { ShareButton } from "../../dropdown/share-button";
import { slugify } from "@/lib/utils";
import { format } from "date-fns";

interface FeaturedCardProps {
  programId: string;
  name: string;
  imageUrl: string | null;
  slots: number;
  deadline: Date;
  location: string;
  description: string;
  submissionType: string;
}

const FeaturedCard = ({ data }: { data: FeaturedCardProps }) => {
  const slug = slugify(data.name);

  return (
    <Card className="bg-accent flex h-[28.5rem] w-[22.5rem] justify-center overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg md:w-[23rem]">
      <CardHeader className="flex flex-row items-start gap-x-3 pb-3">
        <Avatar className="border-background size-12 border-2">
          <AvatarImage
            src={data.imageUrl ?? "https://github.com/shadcn.png"}
            alt="scholarship-logo"
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {data.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <CardTitle className="text-foreground line-clamp-2 text-lg leading-tight">
            {data.name}
          </CardTitle>
          <div className="mt-1 flex items-center gap-2">
            <Badge className="rounded-full text-xs">
              {data.submissionType}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-80 space-y-4 px-6 py-1.5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <UsersRound className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-muted-foreground text-xs">
                Slots Available
              </span>
              <span className="text-foreground line-clamp-1 text-sm font-medium">
                {data.slots} slots
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CalendarDays className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-muted-foreground text-xs">Deadline</span>
              <span className="text-foreground line-clamp-1 text-sm font-medium">
                {format(data.deadline, "MMM dd, yyyy")}
              </span>
            </div>
          </div>
        </div>

        {data.location && (
          <div className="flex items-start gap-2">
            <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-muted-foreground text-xs">Location</span>
              <p className="text-foreground line-clamp-1 text-sm font-medium">
                {data.location}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2">
          <FileText className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-muted-foreground text-xs">Description</span>
            <p className="text-foreground line-clamp-3 text-sm leading-relaxed">
              {data.description || "No description available."}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Link
          href={`${PageRoutes.SCHOLARSHIP_DETAILS}/${data.programId}/${slug}`}
          className="flex-1"
        >
          <Button variant="default" className="w-full" size="sm">
            Apply Now
          </Button>
        </Link>
        <ShareButton
          url={`https://scholarlink.vercel.app${PageRoutes.SCHOLARSHIP_DETAILS}/${data.programId}/${slug}`}
        />
      </CardFooter>
    </Card>
  );
};

export default FeaturedCard;
