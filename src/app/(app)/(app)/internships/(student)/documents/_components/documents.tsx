import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documents = () => {
  return (
    <Tabs defaultValue="documents" className="w-full">
      <TabsList className="gap-x-2 rounded">
        <TabsTrigger value="documents" className="rounded">
          My Documents
        </TabsTrigger>
        <TabsTrigger value="pending" className="rounded">
          Pending
        </TabsTrigger>
        <TabsTrigger value="approved" className="rounded">
          Approved
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="documents"
        className="border-border rounded-xl border"
      ></TabsContent>
      <TabsContent
        value="pending"
        className="border-border rounded-xl border"
      ></TabsContent>
      <TabsContent
        value="approved"
        className="border-border rounded-xl border"
      ></TabsContent>
    </Tabs>
  );
};

export default Documents;
