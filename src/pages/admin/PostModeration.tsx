
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, Eye, ThumbsUp, Trash2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  likes: number;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

export function PostModeration() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data: postsData, error: postsError } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (postsError) throw postsError;
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name');
      
      if (profilesError) throw profilesError;
      
      setPosts(postsData);
      setProfiles(profilesData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load posts",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post",
      });
    }
  };

  const getAuthorName = (authorId: string) => {
    const author = profiles.find(profile => profile.id === authorId);
    return author 
      ? `${author.first_name || ''} ${author.last_name || ''}`.trim() 
      : 'Unknown User';
  };

  const filteredPosts = posts.filter(post => {
    const searchLower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) || 
      post.content.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Community Posts</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={fetchPosts}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
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
              {filteredPosts.map((post) => (
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
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
