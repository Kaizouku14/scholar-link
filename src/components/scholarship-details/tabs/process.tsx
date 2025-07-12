import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface ProcessProps {
  processSteps?: string[];
  importantDates?: Array<{ label: string; date: string }>;
  evaluationCriteria?: Array<{
    name: string;
    weight: string;
    description: string;
  }>;
}

const Process = ({ name, data }: { name: string; data: ProcessProps }) => {
  return (
    <div className="prose max-w-none">
      <h2 className="mb-2 text-2xl font-bold">Application Process</h2>
      <p>Follow these steps to apply for the {name}:</p>

      {data.processSteps && data.processSteps.length > 0 && (
        <div className="my-6 space-y-6">
          {data.processSteps.map((step, index) => (
            <div
              key={index}
              className="border-primary/30 relative border-l-2 pb-8 pl-8"
            >
              <div className="bg-primary absolute top-0 left-[-8px] flex h-4 w-4 items-center justify-center rounded-full p-3 text-white">
                {index + 1}
              </div>
              <div className="ml-4">
                <p className="text-muted-foreground">{step}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.importantDates && data.importantDates.length > 0 && (
        <div className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 text-amber-600" />
            <div>
              <h4 className="font-medium text-black">Important Dates</h4>
              <ul className="mt-1 list-none space-y-1 pl-0 text-sm text-black">
                {data.importantDates.map((dateItem, index) => (
                  <li key={index} className="space-x-1.5">
                    • <span className="text-black">{dateItem.label}:</span>
                    <span className="text-sm text-slate-700">
                      {format(new Date(dateItem.date), "MMM dd, yyyy")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {data.evaluationCriteria && data.evaluationCriteria.length > 0 && (
        <>
          <h3 className="text-xl font-bold">Selection Criteria</h3>
          <div className="my-6 grid gap-4 sm:grid-cols-2">
            {data.evaluationCriteria.map((criterion, index) => (
              <div
                key={index}
                className="border-border rounded-lg border p-8 shadow-sm"
              >
                <h4 className="font-bold">
                  {criterion.name} ({criterion.weight})
                </h4>
                <p className="text-muted-foreground text-sm">
                  {criterion.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Process;
