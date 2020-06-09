import React from "react";
import Layout from "../src/layout/Layout";
import SideMenu from "../src/layout/SideMenu";
import FeedWithMenu from "../src/layout/FeedWithMenu";
import BoardFeed from "../src/board/BoardFeed";
import PostingActionButton from "../src/board/PostingActionButton";
import BoardSidebar from "../src/board/BoardSidebar";
import Button from "../src/common/Button";

import oncelerAvatar from "./images/oncie.jpg";
import greedlerAvatar from "./images/greedler.jpg";
import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";
import hannibalAvatar from "./images/hannibal.png";

import goreBackground from "./images/gore.png";

import anime from "./images/anime.png";
import crack from "./images/crack.png";
import oncelerBoard from "./images/onceler-board.png";
import meta from "./images/meta.png";
import book from "./images/book.png";
import villains from "./images/villains.png";
import kinkmeme from "./images/kink-meme.png";
import art from "./images/art-crit.png";
import mamoru from "./images/mamoru.png";

const PINNED_BOARDS = [
  {
    slug: "gore",
    avatar: "/" + goreBackground,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
  },
  {
    slug: "anime",
    avatar: "/" + anime,
    description: "We put the weeb in dweeb.",
    color: "#24d282",
    updates: 2,
    backgroundColor: "#131518",
  },
  {
    slug: "crack",
    avatar: "/" + crack,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    backgroundColor: "#131518",
  },
  {
    slug: "fic-club",
    avatar: "/" + book,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
  },
  {
    slug: "meta",
    avatar: "/" + meta,
    description: "In My TiMeS wE CaLlEd It WaNk",
    color: "#f9e066",
  },
  {
    slug: "villain-thirst",
    avatar: "/" + villains,
    description: "Love to love 'em.",
    color: "#e22b4b",
  },
];
const SEARCH_BOARDS = [
  {
    slug: "villain-thirst",
    avatar: "/" + villains,
    description: "Love to love 'em.",
    color: "#e22b4b",
  },
  {
    slug: "art-crit",
    avatar: "/" + art,
    description: "Let's learn together!",
    color: "#27caba",
  },
];
const RECENT_BOARDS = [
  {
    slug: "gore",
    avatar: "/" + goreBackground,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
  },
  {
    slug: "oncie-den",
    avatar: "/" + oncelerBoard,
    description: "Party like it's 2012",
    color: "#27caba",
    updates: 10,
    backgroundColor: "#131518",
  },
  {
    slug: "fic-club",
    avatar: "/" + book,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
  },
  {
    slug: "kink-memes",
    avatar: "/" + kinkmeme,
    description: "No limits. No shame.",
    color: "#000000",
  },
  {
    slug: "crack",
    avatar: "/" + crack,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    backgroundColor: "#131518",
  },
];

export default {
  title: "Layout Preview",
  component: Layout,
};

export const SimpleLayout = () => {
  return (
    <Layout
      mainContent={<div>This is the main content!</div>}
      sideMenuContent={<div>Get a load of this menu content!</div>}
      title="!gore"
      onLogoClick={() => console.log("clack")}
    />
  );
};

SimpleLayout.story = {
  name: "simple",
};

export const LoggedInLayout = () => {
  return (
    <Layout
      mainContent={<div>This is the main content!</div>}
      sideMenuContent={<div>Get a load of this menu content!</div>}
      title="!gore"
      user={{
        username: "SexyDaddy69",
        avatarUrl: mamoru,
      }}
    />
  );
};

LoggedInLayout.story = {
  name: "logged in",
};

export const LoadingLayout = () => {
  const [loading, setLoading] = React.useState(true);
  return (
    <Layout
      mainContent={
        <div>
          <Button onClick={() => setLoading(!loading)}>toggle</Button>
        </div>
      }
      sideMenuContent={<div>Get a load of this menu content!</div>}
      title="!gore"
      user={{
        username: "SexyDaddy69",
        avatarUrl: mamoru,
      }}
      loading={loading}
    />
  );
};

LoadingLayout.story = {
  name: "loading",
};

export const BoardSidebarPreview = () => {
  const [color, setColor] = React.useState("#f96680");
  return (
    <div style={{ maxWidth: "500px" }}>
      <BoardSidebar
        board={{
          slug: "gore",
          avatar: `/${goreBackground}`,
          description: "Love me some bruised bois (and more).",
          color,
          boardWideTags: [
            { name: "gore", color: "#f96680" },
            { name: "guro", color: "#e22b4b" },
            { name: "nsfw", color: "#27caba" },
            { name: "dead dove", color: "#f9e066" },
          ],
          canonicalTags: [
            { name: "request", color: "#27caba" },
            { name: "blood", color: "#f96680" },
            { name: "knifeplay", color: "#93b3b0" },
            { name: "aesthetic", color: "#24d282" },
            { name: "impalement", color: "#27caba" },
            { name: "skullfuck", color: "#e22b4b" },
            { name: "hanging", color: "#f9e066" },
            { name: "torture", color: "#f96680" },
            { name: "necrophilia", color: "#93b3b0" },
            { name: "shota", color: "#e22b4b" },
            { name: "fanfiction", color: "#27caba" },
            { name: "rec", color: "#f9e066" },
            { name: "doujinshi", color: "#f96680" },
            { name: "untagged", color: "#93b3b0" },
          ],
          contentRulesTags: [
            { name: "shota", allowed: true },
            { name: "nsfw", allowed: true },
            { name: "noncon", allowed: true },
            { name: "IRL", allowed: false },
            { name: "RP", allowed: false },
          ],
          otherRules: (
            <div>
              <ul>
                <li>
                  Shota <strong>must</strong> be tagged.
                </li>
                <li>
                  Requests go in the appropriate tag. If the same request has
                  been made less than a month ago, it will be deleted by the
                  mods.
                </li>
                <li>
                  Mods might add any TWs tag as they see fit. If you need help,
                  add #untagged and a mod will take care of it.
                </li>
              </ul>
            </div>
          ),
        }}
      />
      <Button onClick={() => setColor("#f96680")}>Pink</Button>
      <Button onClick={() => setColor("#24d282")}>Green</Button>
      <Button onClick={() => setColor("#27caba")}>Blue</Button>
    </div>
  );
};

BoardSidebarPreview.story = {
  name: "sidebar",
};

export const SideMenuPreview = () => {
  return (
    <div style={{ maxWidth: "500px", backgroundColor: "#131518" }}>
      <SideMenu
        pinnedBoards={PINNED_BOARDS}
        searchBoards={SEARCH_BOARDS}
        recentBoards={RECENT_BOARDS}
      />
    </div>
  );
};

SideMenuPreview.story = {
  name: "sidemenu",
};

export const FeedWithMenuShortPreview = () => {
  return (
    <Layout
      mainContent={
        <FeedWithMenu
          sidebarContent={
            <div
              style={{ height: "500px", width: "50%", backgroundColor: "red" }}
            >
              Sidebar Content!!
            </div>
          }
          feedContent={
            <div style={{ height: "500px", backgroundColor: "green" }}>
              Feed Content!!
            </div>
          }
        />
      }
      sideMenuContent={<div>Side menu side menu!</div>}
      title="test!"
      headerAccent="purple"
    />
  );
};

FeedWithMenuShortPreview.story = {
  name: "feed with menu (short)",
};

export const FeedWithMenuPreview = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <Layout
      mainContent={
        <FeedWithMenu
          sidebarContent={
            <div
              style={{ height: "5000px", width: "50%", backgroundColor: "red" }}
            >
              Sidebar!!
            </div>
          }
          feedContent={
            <div style={{ height: "5000px", backgroundColor: "green" }}>
              Feed!!
              <Button onClick={() => setShowSidebar(!showSidebar)}>
                Click!
              </Button>
            </div>
          }
          showSidebar={showSidebar}
          onCloseSidebar={() => setShowSidebar(false)}
        />
      }
      sideMenuContent={<div>Side menu side menu!</div>}
      title="test!"
      headerAccent="purple"
    />
  );
};

FeedWithMenuPreview.story = {
  name: "feed with menu",
};

export const Attempt1 = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <>
      <Layout
        mainContent={
          <BoardFeed
            posts={[
              {
                createdTime: "1 minute ago",
                text: '[{"insert":"A short post."}]',
                secretIdentity: {
                  name: "Good Guy",
                  avatar: `/${oncelerAvatar}`,
                },
                newPost: true,
                totalComments: 6,
                totalContributions: 5,
                directContributions: 3,
              },
              {
                createdTime: "5 minutes ago",
                text:
                  '[{"insert":"Nishin Masumi Reading Group (Week 2)"},{"attributes":{"header":1},"insert":"\\n"},{"insert":"\\nAs you know, we\'re going through \\"Host is Down\\" this week! \\n\\n"},{"attributes":{"alt":"Host is Down by Mado Fuchiya (Nishin)"},"insert":{"image":"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1564868627l/50190748._SX1200_SY630_.jpg"}},{"insert":"\\n\\nThis is the official discussion thread. Feel free to comment, but remember to tag spoilers (or suffer the mods\' wrath).\\n"}]',
                secretIdentity: {
                  name: "Good Guy",
                  avatar: `/${oncelerAvatar}`,
                },
                newPost: true,
                totalComments: 6,
                totalContributions: 5,
                directContributions: 3,
              },
              {
                createdTime: "10 hours ago",
                text:
                  '[{"insert":"Help a Thirsty, Thirsty Anon"},{"attributes":{"header":1},"insert":"\\n"},{"insert":"\\nI recently discovered "},{"attributes":{"link":"https://myanimelist.net/manga/115345/MADK"},"insert":"MadK"},{"insert":", and I\'ve fallen in love with the combination of beautiful art and great story. I\'ve been trying to put together a list of recs of the angstiest, goriest series out there. It\'s been surprisingly hard to find the Good Shit.\\n\\nWhat\'s your favorite series and why?\\n"}]',
                secretIdentity: {
                  name: "Tuxedo Mask",
                  avatar: `/${tuxedoAvatar}`,
                },
                userIdentity: {
                  name: "SexyDaddy69",
                  avatar: `/${mamoruAvatar}`,
                },
                options: {
                  wide: true,
                },
                newComments: 5,
                totalComments: 6,
                totalContributions: 5,
                directContributions: 3,
              },
              {
                createdTime: "yesterday",
                text:
                  '[{"insert":"Monthly Art Roundup"},{"attributes":{"header":1},"insert":"\\n"},{"insert":"\\nPost your favorites! As usual, remember to embed the actual posts (unless it\'s your own art, then do as you wish). Reposting is a no-no. \\n\\nI\'ll start with one of my favorite artists:\\n"},{"insert":{"tweet":"https://twitter.com/notkrad/status/1222638147886034945"}}]',
                secretIdentity: {
                  name: "Bad Guy",
                  avatar: `/${greedlerAvatar}`,
                },
                newComments: 5,
                newContributions: 2,
                totalComments: 6,
                totalContributions: 5,
                directContributions: 3,
              },
              {
                createdTime: "3 days ago",
                text:
                  '[{"insert":{"block-image":"https://media.tenor.com/images/97b761adf7bdc9d72fc1fadbbaa3a4a6/tenor.gif"}},{"insert":"(I got inspired to write a quick cannibalism drabble. Wanted to share it and get your opinion while I decide whether to turn it into a longer fic!)\\n"}]',
                secretIdentity: {
                  name: "Nice Therapist",
                  avatar: `/${hannibalAvatar}`,
                },
                userIdentity: {
                  name: "xXxChesapeakeRipperxXx",
                  avatar: `/${hannibalAvatar}`,
                },
                newContributions: 3,
                totalComments: 6,
                totalContributions: 5,
                directContributions: 3,
              },
            ]}
            showSidebar={showSidebar}
            onCloseSidebar={() => setShowSidebar(false)}
            boardInfo={{
              slug: "gore",
              avatar: `/${goreBackground}`,
              description: "Love me some bruised bois (and more).",
              color: "#f96680",
              boardWideTags: [
                { name: "gore", color: "#f96680" },
                { name: "guro", color: "#e22b4b" },
                { name: "nsfw", color: "#27caba" },
                { name: "dead dove", color: "#f9e066" },
              ],
              canonicalTags: [
                { name: "request", color: "#27caba" },
                { name: "blood", color: "#f96680" },
                { name: "knifeplay", color: "#93b3b0" },
                { name: "aesthetic", color: "#24d282" },
                { name: "impalement", color: "#27caba" },
                { name: "skullfuck", color: "#e22b4b" },
                { name: "hanging", color: "#f9e066" },
                { name: "torture", color: "#f96680" },
                { name: "necrophilia", color: "#93b3b0" },
                { name: "shota", color: "#e22b4b" },
                { name: "fanfiction", color: "#27caba" },
                { name: "rec", color: "#f9e066" },
                { name: "doujinshi", color: "#f96680" },
                { name: "untagged", color: "#93b3b0" },
              ],
              contentRulesTags: [
                { name: "shota", allowed: true },
                { name: "nsfw", allowed: true },
                { name: "noncon", allowed: true },
                { name: "IRL", allowed: false },
                { name: "RP", allowed: false },
              ],
              otherRules: (
                <div>
                  <ul>
                    <li>
                      Shota <strong>must</strong> be tagged.
                    </li>
                    <li>
                      Requests go in the appropriate tag. If the same request
                      has been made less than a month ago, it will be deleted by
                      the mods.
                    </li>
                    <li>
                      Mods might add any TWs tag as they see fit. If you need
                      help, add #untagged and a mod will take care of it.
                    </li>
                  </ul>
                </div>
              ),
            }}
            accentColor={"#f96680"}
          />
        }
        sideMenuContent={
          <SideMenu
            pinnedBoards={PINNED_BOARDS}
            searchBoards={SEARCH_BOARDS}
            recentBoards={RECENT_BOARDS}
          />
        }
        actionButton={
          <PostingActionButton
            accentColor="#f96680"
            onNewPost={() => console.log("hi!")}
          />
        }
        headerAccent="#f96680"
        title="!gore"
        onLogoClick={() => console.log("clack")}
        onTitleClick={() => {
          setShowSidebar(!showSidebar);
        }}
      />
    </>
  );
};

Attempt1.story = {
  name: "there was an attempt",
};
