import "resize-observer-polyfill";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import BoardFeed from "./board/BoardFeed";
import BoardSidebar from "./board/BoardSidebar";
import BoardsDisplay from "./board/BoardsDisplay";
import SideMenu from "./layout/SideMenu";
import FeedWithMenu from "./layout/FeedWithMenu";
import Button, { ButtonStyle } from "./common/Button";
import Input, { InputStyle } from "./common/Input";
import Modal from "./common/Modal";
import PostEditor from "./post/PostEditor";
import Post, { PostSizes } from "./post/Post";
import Comment from "./post/Comment";
import CommentEditor from "./post/CommentEditor";
import ThreadIndent from "./post/ThreadIndent";
import PostingActionButton from "./board/PostingActionButton";
import Layout from "./layout/Layout";

import flush from "styled-jsx/server";

export {
  Layout,
  BoardFeed,
  Button,
  ButtonStyle,
  SideMenu,
  Input,
  InputStyle,
  Modal,
  Post,
  PostSizes,
  PostEditor,
  PostingActionButton,
  Comment,
  CommentEditor,
  ThreadIndent,
  FeedWithMenu,
  BoardSidebar,
  BoardsDisplay,
  flush,
};
