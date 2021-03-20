import "resize-observer-polyfill";
import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
require("intersection-observer");

import BoardSidebar from "./board/BoardSidebar";
import BoardsDisplay from "./board/BoardsDisplay";
import SideMenu from "./layout/SideMenu";
import FeedWithMenu from "./layout/FeedWithMenu";
import Button, { ButtonStyle } from "./common/Button";
import Input, { InputStyle } from "./common/Input";
import ToastContainer, { toast } from "./common/Toast";
import Modal from "./common/Modal";
import ModalWithButtons from "./common/ModalWithButtons";
import PostEditor from "./post/PostEditor";
import Post, { PostSizes } from "./post/Post";
import Comment from "./post/Comment";
import CompactThreadIndent, { useIndent } from "./post/CompactThreadIndent";
import CompactPostThread from "./post/CompactPostThread";
import CommentChain from "./post/CommentChain";
import CommentChainEditor from "./post/CommentChainEditor";
import CommentEditor from "./post/CommentEditor";
import ThreadIndent from "./post/ThreadIndent";
import NewThread from "./thread/NewThread";
import NewCommentsThread from "./thread/NewCommentsThread";
import CollapsedPlaceholder from "./thread/CollapsedPlaceholder";
import PostingActionButton from "./board/PostingActionButton";
import CycleNewButton from "./board/CycleNewButton";
import Layout from "./layout/Layout";
import { useCompact } from "./utils";
import DefaultTheme from "./theme/default";
import TagsFilterSection from "./board/TagsFilterSection";
import MasonryView from "./layout/MasonryView";
import PostQuote from "./post/PostQuote";
import UserDetails from "./user/UserDetails";
import BobaDex from "./user/BobaDex";
import { TagType } from "./types";
import { EditorContext } from "@bobaboard/boba-editor";
import SegmentedButton from "./common/SegmentedButton";
import LoadingBar from "./common/LoadingBar";

import flush from "styled-jsx/server";

interface ImageUploaderContextProps {
  onImageUploadRequest: (imgUrl: string) => Promise<string>;
}
const ImageUploaderContext = React.createContext<ImageUploaderContextProps | null>(
  null
);

export {
  Layout,
  Button,
  ButtonStyle,
  SideMenu,
  Input,
  InputStyle,
  Modal,
  UserDetails,
  ModalWithButtons,
  Post,
  PostSizes,
  PostEditor,
  PostingActionButton,
  Comment,
  CommentChain,
  CommentChainEditor,
  CompactThreadIndent,
  CompactPostThread,
  useIndent,
  CommentEditor,
  CycleNewButton,
  ThreadIndent,
  FeedWithMenu,
  BoardSidebar,
  BoardsDisplay,
  ToastContainer,
  MasonryView,
  LoadingBar,
  toast,
  EditorContext,
  ImageUploaderContext,
  flush,
  useCompact,
  DefaultTheme,
  TagsFilterSection,
  PostQuote,
  NewThread,
  CollapsedPlaceholder,
  BobaDex,
  SegmentedButton,
  NewCommentsThread,
  TagType,
};

import type { TagsType } from "./types";
import type { PostHandler } from "./post/Post";
import type { CommentHandler } from "./post/Comment";
import type { SideMenuHandler } from "./layout/SideMenu";
export type { TagsType, PostHandler, CommentHandler, SideMenuHandler };
