import { ClientDocumentPage } from "./ClientDocumentPage";

interface Params {
  documentId: string;
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  return <ClientDocumentPage documentId={resolvedParams.documentId} />;
};

export default Page;
