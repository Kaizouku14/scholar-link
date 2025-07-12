import { CheckCircle, Info } from "lucide-react";

interface RequirementsProps {
  documentCategories?: Array<{
    name: string;
    items: string[];
  }>;
  submissionGuidelines?: string[];
}

const Requirements = ({ data }: { data: RequirementsProps }) => {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold">Application Requirements</h2>
      <p>
        Please prepare the following documents for your scholarship application:
      </p>

      {data.documentCategories && data.documentCategories.length > 0 && (
        <div className="my-6 space-y-6">
          {data.documentCategories.map((category, index) => (
            <div key={index} className="overflow-hidden rounded-lg border">
              <div className="bg-primary/5 border-b p-3">
                <h3 className="font-bold">{category.name}</h3>
              </div>
              <div className="space-y-3 p-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <CheckCircle className="text-primary mt-1 h-4 w-4" />
                    <div>
                      <p className="font-medium">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.submissionGuidelines && data.submissionGuidelines.length > 0 && (
        <div className="bg-primary/5 border-primary/10 my-6 rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <Info className="text-primary mt-0.5 h-5 w-5" />
            <div>
              <h4 className="font-medium">Submission Guidelines</h4>
              <ul className="mt-1 list-none space-y-1 pl-0 text-sm">
                {data.submissionGuidelines.map((guideline, index) => (
                  <li key={index}>• {guideline}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requirements;
