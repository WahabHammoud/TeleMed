
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  likes: number;
  created_at: string;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

export const usePosts = () => {
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts: filteredPosts,
    profiles,
    loading,
    searchQuery,
    setSearchQuery,
    fetchPosts,
    handleDeletePost,
    getAuthorName
  };
};
