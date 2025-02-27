
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, ThumbsUp, Send, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  created_at: string;
  author_id: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  post_id: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

export default function CommunityPage() {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return profile;
    },
  });

  const { data: posts, refetch: refetchPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    },
  });

  const { data: profiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name');
      
      if (error) throw error;
      return data as Profile[];
    },
  });

  const { data: comments, refetch: refetchComments } = useQuery({
    queryKey: ['comments', selectedPost?.id],
    queryFn: async () => {
      if (!selectedPost) return [];
      
      const { data, error } = await supabase
        .from('community_comments')
        .select('*')
        .eq('post_id', selectedPost.id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!selectedPost,
  });

  const createPost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !currentUser) return;

    const { error } = await supabase
      .from('community_posts')
      .insert({
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
        author_id: currentUser.id
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post",
      });
      return;
    }

    setNewPostTitle("");
    setNewPostContent("");
    refetchPosts();
  };

  const createComment = async () => {
    if (!newComment.trim() || !selectedPost || !currentUser) return;

    const { error } = await supabase
      .from('community_comments')
      .insert({
        content: newComment.trim(),
        post_id: selectedPost.id,
        author_id: currentUser.id
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add comment",
      });
      return;
    }

    setNewComment("");
    refetchComments();
  };

  // Helper function to find author name
  const getAuthorName = (authorId: string) => {
    const author = profiles?.find(profile => profile.id === authorId);
    return author ? `${author.first_name || ''} ${author.last_name || ''}`.trim() : 'Unknown User';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground mt-2">
            Connect with other patients and doctors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <Input
                  placeholder="Share your thoughts..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <Button onClick={createPost}>Post</Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {posts?.map((post) => (
                <Card key={post.id} className="cursor-pointer hover:bg-accent/50">
                  <CardContent 
                    className="p-6"
                    onClick={() => setSelectedPost(post)}
                  >
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Comment
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Posted by {getAuthorName(post.author_id)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {selectedPost ? "Comments" : "Select a post to view comments"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPost ? (
                <>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {comments?.map((comment) => (
                        <div key={comment.id} className="border-b pb-4">
                          <p className="mb-2">{comment.content}</p>
                          <p className="text-sm text-muted-foreground">
                            {getAuthorName(comment.author_id)} •{" "}
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex gap-2 mt-4">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          createComment();
                        }
                      }}
                    />
                    <Button onClick={createComment}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <Users className="h-12 w-12 mb-4" />
                  <p>Select a post to view and participate in the discussion</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
