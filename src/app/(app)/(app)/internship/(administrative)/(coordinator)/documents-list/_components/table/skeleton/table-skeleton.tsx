import { Skeleton } from "@/components/ui/skeleton";

export function DocumentsTableSkeleton() {
  const rows = Array.from({ length: 15 });

  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="p-2 text-left">Document</th>
          <th className="p-2 text-center">Status</th>
          <th className="p-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((_, index) => (
          <tr key={index} className="border-t">
            {/* Document column */}
            <td className="p-2">
              <Skeleton className="h-4 w-32" />
            </td>

            {/* Status column */}
            <td className="flex justify-center p-2 text-center">
              <Skeleton className="h-4 w-4 rounded-full" />
            </td>

            {/* Action column */}
            <td className="px-2 py-1">
              <Skeleton className="h-8 w-8 rounded-md" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
