import "resize-observer-polyfill";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import BoardFeed from "./board/BoardFeed";
import BoardSidebar from "./board/BoardSidebar";
import SideMenu from "./layout/SideMenu";
import FeedWithMenu from "./layout/FeedWithMenu";
import Button from "./common/Button";
import Modal from "./common/Modal";
import PostEditor from "./post/PostEditor";
import Post, { PostSizes } from "./post/Post";
import Comment from "./post/Comment";
import ThreadIndent from "./post/ThreadIndent";
import PostingActionButton from "./board/PostingActionButton";
import Layout from "./layout/Layout";

import flush from "styled-jsx/server";

export {
  Layout,
  BoardFeed,
  Button,
  SideMenu,
  Modal,
  Post,
  PostSizes,
  PostEditor,
  PostingActionButton,
  Comment,
  ThreadIndent,
  FeedWithMenu,
  BoardSidebar,
  flush,
};
