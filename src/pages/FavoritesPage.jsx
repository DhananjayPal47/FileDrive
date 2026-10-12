import { FileBrowser } from "@/components/files/FileBrowser";

export default function FavoritesPage() {
  return (
    <div>
      <FileBrowser title="Favorites" favoritesOnly />
    </div>
  );
}
