
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, Search, RefreshCw, Eye, Check, ThumbsUp, MessageCircle } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  likes: number;
  created_at: string;
}

interface Comment {
  id: string;
  content: string;
  author_id: string;
  post_id: string;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

export function PostModeration() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [viewPostDialogOpen, setViewPostDialogOpen] = useState(false);
  const [viewCommentsDialogOpen, setViewCommentsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      const { data: postsData, error: postsError } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (postsError) throw postsError;
      
      // Get profiles for author names
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

  const fetchComments = async (postId: string) => {
    try {
      const { data: commentsData, error: commentsError } = await supabase
        .from('community_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (commentsError) throw commentsError;
      
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load comments",
      });
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

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('community_comments')
        .delete()
        .eq('id', commentId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
      
      if (selectedPost) {
        fetchComments(selectedPost.id);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete comment",
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
    <>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      {post.title.length > 30 
                        ? post.title.substring(0, 30) + '...' 
                        : post.title}
                    </TableCell>
                    <TableCell>
                      {getAuthorName(post.author_id)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {post.likes}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedPost(post);
                            setViewPostDialogOpen(true);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Post
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedPost(post);
                            fetchComments(post.id);
                            setViewCommentsDialogOpen(true);
                          }}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            View Comments
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete Post
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Post Dialog */}
      <Dialog open={viewPostDialogOpen} onOpenChange={setViewPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
            <DialogDescription>
              {selectedPost && (
                <span>
                  by {getAuthorName(selectedPost.author_id)}{" "}
                  on {new Date(selectedPost.created_at).toLocaleString()}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPost && (
            <div className="grid gap-4 py-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedPost.title}</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {selectedPost.content}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewPostDialogOpen(false)}>
              Close
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedPost) {
                  handleDeletePost(selectedPost.id);
                  setViewPostDialogOpen(false);
                }
              }}
            >
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Comments Dialog */}
      <Dialog open={viewCommentsDialogOpen} onOpenChange={setViewCommentsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>
              {selectedPost && `Comments on "${selectedPost.title}"`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[400px] overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No comments on this post</p>
            ) : (
              <div className="space-y-4 py-4">
                {comments.map(comment => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="mb-1">{comment.content}</p>
                        <p className="text-sm text-muted-foreground">
                          {getAuthorName(comment.author_id)}{" • "}
                          {new Date(comment.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewCommentsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
