import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig, Info } from "lucide-react";

interface AdditionalInfoProps {
  benefits?: Array<{
    title: string;
    description: string;
  }>;
  overview?: string;
  note?: string;
  history?: string;
}

const About = ({
  name,
  description,
  data,
}: {
  name: string;
  description: string;
  data: AdditionalInfoProps;
}) => {
  return (
    <div className="prose max-w-none">
      <h2 className="mb-2 text-2xl font-bold">{name}</h2>
      <p>{description}</p>

      {data && data.benefits && data.benefits.length > 0 && (
        <div className="my-6">
          <h3 className="mb-4 text-xl font-bold">Program Benefits</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {data &&
              data.benefits?.map((benefit, index) => {
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-full p-2">
                          <CircleCheckBig className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold">{benefit.title}</h4>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      )}

      {data && data.overview && (
        <>
          <h3 className="text-xl font-bold">Program Overview</h3>
          <p>{data.overview}</p>
        </>
      )}

      {data && data.note && (
        <div className="bg-primary/5 border-primary/10 my-6 rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <Info className="text-primary mt-0.5 h-5 w-5" />
            <div>
              <h4 className="font-medium">Important Note</h4>
              <p className="text-sm">{data.note}</p>
            </div>
          </div>
        </div>
      )}

      {data && data.history && (
        <>
          <h3 className="text-xl font-bold">Program History</h3>
          <p>{data.history}</p>
        </>
      )}
    </div>
  );
};

export default About;
