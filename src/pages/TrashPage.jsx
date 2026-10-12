import { FileBrowser } from "@/components/files/FileBrowser";

export default function TrashPage() {
  return (
    <div>
      <FileBrowser title="Trash" deletedOnly />
    </div>
  );
}
