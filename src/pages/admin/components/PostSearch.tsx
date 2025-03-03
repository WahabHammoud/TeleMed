
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";

interface PostSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

export function PostSearch({ searchQuery, onSearchChange, onRefresh }: PostSearchProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          className="pl-8 w-[250px]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" size="sm" onClick={onRefresh}>
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
