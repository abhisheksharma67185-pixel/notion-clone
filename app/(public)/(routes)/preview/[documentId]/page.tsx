import { ClientPreviewPage } from "./ClientPreviewPage";

export const dynamic = "force-dynamic";

interface DocumentIdProps {
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentId = async ({ params }: DocumentIdProps) => {
  const resolvedParams = await params;
  return (
    <ClientPreviewPage
      key={resolvedParams.documentId}
      documentId={resolvedParams.documentId}
    />
  );
};

export default DocumentId;
