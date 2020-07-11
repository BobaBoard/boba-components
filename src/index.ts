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
import ToastContainer, { toast } from "./common/Toast";
import Modal from "./common/Modal";
import ModalWithButtons from "./common/ModalWithButtons";
import PostEditor, { setTumblrEmbedFetcher } from "./post/PostEditor";
import Post, { PostSizes } from "./post/Post";
import Comment from "./post/Comment";
import CommentEditor from "./post/CommentEditor";
import ThreadIndent from "./post/ThreadIndent";
import PostingActionButton from "./board/PostingActionButton";
import Layout from "./layout/Layout";
import { useCompact } from "./utils";

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
  ModalWithButtons,
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
  ToastContainer,
  toast,
  setTumblrEmbedFetcher,
  flush,
  useCompact,
};
