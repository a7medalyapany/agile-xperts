import { FC, useEffect, useState } from "react";
import Pulse from "@/components/card/Pulse";
import { searchPosts } from "@/lib/actions/search.action";

interface PostResultsProps {
  query: string;
}

const PostResults: FC<PostResultsProps> = ({ query }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await searchPosts(query);
      setPosts(result);
      setLoading(false);
    };

    fetchPosts();
  }, [query]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {posts?.map((pulse: any) => (
        <Pulse
          key={pulse.post_id!}
          id={pulse.post_id!}
          content={pulse.content}
          photo={pulse.img_url}
          createdAt={pulse.created_at!}
          updatedAt={pulse.updated_at!}
          authorId={pulse.author_id!}
          authorName={pulse.author_name!}
          authorUsername={pulse.author_username!}
          authorAvatar={pulse.author_avatar_url!}
          likeCount={pulse.like_count!}
          replyCount={pulse.reply_count!}
          repostCount={pulse.repost_count!}
          isEchoBack={false}
          echoBack={pulse.reply_avatars || []}
          hasLiked={pulse.has_liked!}
          hasReposted={pulse.has_reposted!}
          hasBookmarked={pulse.has_bookmarked!}
        />
      ))}
    </>
  );
};

export default PostResults;
