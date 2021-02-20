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
import Post, { PostSizes, PostHandler } from "./post/Post";
import Comment, { CommentHandler } from "./post/Comment";
import CompactThreadIndent, { useIndent } from "./post/CompactThreadIndent";
import CompactPostThread from "./post/CompactPostThread";
import CommentChain from "./post/CommentChain";
import CommentChainEditor from "./post/CommentChainEditor";
import CommentEditor from "./post/CommentEditor";
import ThreadIndent from "./post/ThreadIndent";
import NewThread from "./thread/NewThread";
import CollapsedPlaceholder from "./thread/CollapsedPlaceholder";
import PostingActionButton from "./board/PostingActionButton";
import CycleNewButton from "./board/CycleNewButton";
import Layout from "./layout/Layout";
import { useCompact } from "./utils";
import DefaultTheme from "./theme/default";
import CategoryFilter from "./common/CategoryFilter";
import MasonryView from "./layout/MasonryView";
import PostQuote from "./post/PostQuote";
import UserDetails from "./user/UserDetails";
import BobaDex from "./user/BobaDex";
import { TagType } from "./types";
import { EditorContext } from "@bobaboard/boba-editor";

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
  PostHandler,
  PostEditor,
  PostingActionButton,
  Comment,
  CommentChain,
  CommentChainEditor,
  CommentHandler,
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
  toast,
  EditorContext,
  ImageUploaderContext,
  flush,
  useCompact,
  DefaultTheme,
  CategoryFilter,
  PostQuote,
  NewThread,
  CollapsedPlaceholder,
  BobaDex,
  TagType,
};

import type { TagsType } from "./types";
export type { TagsType };
