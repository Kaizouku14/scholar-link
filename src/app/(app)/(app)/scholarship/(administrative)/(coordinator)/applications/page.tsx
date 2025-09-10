"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";

const Pages = () => {
  const [count, setCount] = useState(0);
  const { mutateAsync: testSubscription } =
    api.scholarshipCoordinator.testSubscription.useMutation();

  api.scholarshipCoordinator.getNewApplicationsSimple.useSubscription(
    undefined,
    {
      onStarted: () =>
        console.log("🔗 [CLIENT] Subscription started successfully"),
      onData: (data) => {
        setCount((prev) => prev + data);
      },
      onError: (e) => console.log(e),
    },
  );

  const handleClick = async () => {
    await testSubscription({ count: 1 });
  };

  return (
    <div className="flex flex-col">
      <div>{count}</div>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
};

export default Pages;
