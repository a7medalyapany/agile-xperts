import Pulse from "@/components/card/Pulse";
import { FC } from "react";

interface PostResultsProps {}

const PostResults: FC<PostResultsProps> = () => {
  const data = [
    {
      post_id: 11,
      content:
        "Blockchain isn’t just for crypto! Exploring how blockchain technology can revolutionize data security and transparency in various industries.",
      img_url: null,
      created_at: "2024-06-21T12:45:56.305517+00:00",
      updated_at: "2024-06-21T12:45:56.305517+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 0,
      reply_count: 0,
      repost_count: 0,
      reply_avatars: null,
      has_liked: false,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 10,
      content:
        "Got my hands on some new hardware for testing IoT projects. The Internet of Things is such an exciting field with endless possibilities. From smart homes to industrial applications, the future is interconnected. Who else is working on IoT",
      img_url: null,
      created_at: "2024-06-21T05:29:54.875685+00:00",
      updated_at: "2024-06-21T05:29:54.875685+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 0,
      reply_count: 0,
      repost_count: 0,
      reply_avatars: null,
      has_liked: false,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 9,
      content:
        "Hackathon weekend was a blast! Built a fully functional prototype in just 48 hours. The energy and creativity were off the charts. If you haven't participated in one yet, you’re missing out. Get out there and hack away!",
      img_url: null,
      created_at: "2024-06-21T05:27:27.487954+00:00",
      updated_at: "2024-06-21T05:27:27.487954+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 0,
      reply_count: 0,
      repost_count: 0,
      reply_avatars: null,
      has_liked: false,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 8,
      content: null,
      img_url:
        "https://th.bing.com/th/id/OIP.5NwMCDoDFaeNrwTDoJ1mywHaD4?rs=1&pid=ImgDetMain",
      created_at: "2024-06-19T19:28:11.712907+00:00",
      updated_at: "2024-06-19T19:28:11.712907+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 1,
      reply_count: 0,
      repost_count: 0,
      reply_avatars: null,
      has_liked: false,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 7,
      content:
        "Cloud computing is the future of scalable applications. Just migrated our entire infrastructure to AWS and the flexibility is insane. If you're still on the fence about going cloud, hit me up. Happy to share my experiences",
      img_url: null,
      created_at: "2024-06-17T03:43:55.673339+00:00",
      updated_at: "2024-06-17T03:43:55.673339+00:00",
      author_id: "deb1373e-2ee2-4a8f-8892-c0756ff3e4f7",
      author_name: "alyapany",
      author_username: "StrondDude",
      author_avatar_url:
        "https://ui-avatars.com/api/?name=ahmedalyapany60&background=random&color=fff",
      like_count: 0,
      reply_count: 0,
      repost_count: 0,
      reply_avatars: null,
      has_liked: false,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 6,
      content:
        "Teamwork makes the dream work! Collaborating on an open-source project and the community is amazing. The best part of coding is sharing knowledge and building together. Join us if you're interested. Let's create something awesome",
      img_url: null,
      created_at: "2024-06-15T13:27:48.107542+00:00",
      updated_at: "2024-06-15T13:27:48.107542+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 1,
      reply_count: 1,
      repost_count: 0,
      reply_avatars: ["https://avatars.githubusercontent.com/u/103336732?v=4"],
      has_liked: true,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 5,
      content:
        "AI and machine learning are changing the game! Been experimenting with some new algorithms and the results are mind-blowing. The future is now, folks. If you haven't started learning about AI yet, now's the time. Let's discuss!",
      img_url: null,
      created_at: "2024-06-15T13:18:36.895775+00:00",
      updated_at: "2024-06-15T13:18:36.895775+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 1,
      reply_count: 1,
      repost_count: 0,
      reply_avatars: ["https://avatars.githubusercontent.com/u/103336732?v=4"],
      has_liked: true,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 4,
      content:
        "Learning a new programming language is always a challenge, but it's also super rewarding. Diving into Rust lately and it's been a wild ride. Anyone else tackling new languages? Share your experiences, tips, or struggles. We're all in this together",
      img_url: null,
      created_at: "2024-06-15T08:01:18.550191+00:00",
      updated_at: "2024-06-15T08:01:18.550191+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 1,
      reply_count: 0,
      repost_count: 0,
      reply_avatars: null,
      has_liked: true,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 3,
      content:
        "Just launched my new app! Months of late nights and caffeine have finally paid off. It's live on the App Store and Google Play. Would love for y'all to check it out and let me know what you think. Your feedback means everything!",
      img_url:
        "https://th.bing.com/th/id/R.5bc1ea0d0574e4895af1b2744d65abce?rik=GWLL1WcUufYYdQ&pid=ImgRaw&r=0",
      created_at: "2024-06-15T07:56:05.704551+00:00",
      updated_at: "2024-06-15T07:56:05.704551+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 2,
      reply_count: 0,
      repost_count: 0,
      reply_avatars: null,
      has_liked: true,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 2,
      content: null,
      img_url:
        "https://yebfjnpgfjzywaeynfzx.supabase.co/storage/v1/object/public/public_posts/5ce3dc48-2135-4f6d-9866-910d7ea34b96/0.22449247836131203homepage.png",
      created_at: "2024-06-15T07:55:13.690439+00:00",
      updated_at: "2024-06-15T07:55:13.690439+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 0,
      reply_count: 0,
      repost_count: 0,
      reply_avatars: null,
      has_liked: false,
      has_reposted: false,
      has_bookmarked: false,
    },
    {
      post_id: 1,
      content:
        "Spent the whole weekend debugging this nightmare code. Finally found the issue buried in a single line. It’s always the tiny things that trip you up! Feeling like a superhero now. If you’re struggling, keep at it. That ‘aha!’ moment is worth it. ",
      img_url: null,
      created_at: "2024-06-15T07:53:21.083622+00:00",
      updated_at: "2024-06-15T07:53:21.083622+00:00",
      author_id: "dc00edc4-7ae6-4daf-a143-9a81051cbf50",
      author_name: "Ahmed Ibrahim",
      author_username: "a7medalyapany",
      author_avatar_url:
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      like_count: 1,
      reply_count: 5,
      repost_count: 0,
      reply_avatars: [
        "https://ui-avatars.com/api/?name=ahmedalyapany60&background=random&color=fff",
        "https://avatars.githubusercontent.com/u/103336732?v=4",
        "https://avatars.githubusercontent.com/u/103336732?v=4",
      ],
      has_liked: true,
      has_reposted: false,
      has_bookmarked: false,
    },
  ];
  return (
    <>
      {data.map((pulse) => (
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
