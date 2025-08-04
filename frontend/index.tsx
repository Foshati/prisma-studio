import "./index.css";
import "@prisma/studio-core/ui/index.css";

import { createRoot } from "react-dom/client";

import { Layout } from "./components/layout";

import { createPostgresAdapter } from "@prisma/studio-core/data/postgres-core";
import { createStudioBFFClient } from "@prisma/studio-core/data/bff";
import { Studio } from "@prisma/studio-core/ui";
import { useMemo } from "react";

function App() {
  // We create the Studio adapter that executes queries
  // This is memoized to prevent full reloads on re-renders
  const adapter = useMemo(() => {
    // Studio needs an executor to execute its SQL queries
    // We set it up to point it against our backend endpoint
    const executor = createStudioBFFClient({
      url: `http://localhost:${import.meta.env.SERVER_PORT}/studio`,
      customHeaders: {
        "X-Custom-Header": "example-value",
      },
      customPayload: {
        customValue: "example-value"
      }
    });

    // We then set the dialect this way and pass the executor
    const adapter = createPostgresAdapter({ executor });

    return adapter;
  }, []);

  return (
    <Layout>
      <Studio adapter={adapter} />
    </Layout>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
