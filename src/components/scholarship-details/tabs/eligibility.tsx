import { CheckCircle, Info } from "lucide-react";

interface EligibilityProps {
  eligibilityCriteria?: string[];
  priority?: string;
  maintenanceRequirements?: string[];
}

const Eligibility = ({
  name,
  data,
}: {
  name: string;
  data: EligibilityProps;
}) => {
  return (
    <div className="prose max-w-none">
      <h2 className="mb-2 text-2xl font-bold">Eligibility Criteria</h2>
      <p>
        To be eligible for the {name}, applicants must meet the following
        criteria:
      </p>

      {data.eligibilityCriteria && data.eligibilityCriteria?.length > 0 && (
        <div className="my-6 space-y-4">
          {data.eligibilityCriteria.map((criterion, index) => (
            <div
              key={index}
              className="border-border flex items-start gap-3 rounded-lg border p-4"
            >
              <CheckCircle className="text-primary mt-0.5 h-5 w-5" />
              <div>
                <p className="text-muted-foreground">{criterion}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.priority && (
        <div className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 text-amber-600" />
            <div>
              <h4 className="font-medium text-amber-600">
                Priority Applicants
              </h4>
              <p className="text-sm text-amber-600">{data.priority}</p>
            </div>
          </div>
        </div>
      )}

      {data.maintenanceRequirements &&
        data.maintenanceRequirements.length > 0 && (
          <div className="flex flex-col gap-y-4">
            <h3 className="text-xl font-bold">Maintaining Eligibility</h3>
            <p>To maintain eligibility, recipients must:</p>
            <ul className="list-disc space-y-2 pl-6">
              {data.maintenanceRequirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
            <p>
              Failure to meet these requirements may result in the suspension or
              termination of the scholarship.
            </p>
          </div>
        )}
    </div>
  );
};

export default Eligibility;
