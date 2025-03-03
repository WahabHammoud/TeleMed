
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, ThumbsUp, Trash2 } from "lucide-react";
import { Post } from "../hooks/usePosts";

interface PostsTableProps {
  posts: Post[];
  getAuthorName: (authorId: string) => string;
  onDeletePost: (postId: string) => void;
}

export function PostsTable({ posts, getAuthorName, onDeletePost }: PostsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Likes</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">
              {post.title.length > 50 
                ? post.title.substring(0, 50) + '...' 
                : post.title}
            </TableCell>
            <TableCell>{getAuthorName(post.author_id)}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {post.likes}
              </div>
            </TableCell>
            <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDeletePost(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
