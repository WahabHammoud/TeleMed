
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostSearch } from "./components/PostSearch";
import { PostsTable } from "./components/PostsTable";
import { LoadingState } from "./components/LoadingState";
import { usePosts } from "./hooks/usePosts";

export function PostModeration() {
  const {
    posts,
    loading,
    searchQuery,
    setSearchQuery,
    fetchPosts,
    handleDeletePost,
    getAuthorName
  } = usePosts();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Community Posts</CardTitle>
        <PostSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={fetchPosts}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingState />
        ) : (
          <PostsTable 
            posts={posts}
            getAuthorName={getAuthorName}
            onDeletePost={handleDeletePost}
          />
        )}
      </CardContent>
    </Card>
  );
}
