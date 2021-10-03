import "resize-observer-polyfill";
import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
require("intersection-observer");

import BoardSidebar from "./board/BoardSidebar";
import BoardsDisplay from "./board/BoardsDisplay";
import SideMenu from "./sidemenu/SideMenu";
import FeedWithMenu from "./feeds/FeedWithMenu";
import Button, { ButtonStyle } from "./buttons/Button";
import Input, { InputStyle } from "./common/Input";
import ToastContainer, { toast } from "./common/Toast";
import Modal from "./common/Modal";
import PinnedMenu from "./sidemenu/PinnedMenu";
import ModalWithButtons from "./common/ModalWithButtons";
import PostEditor from "./post/PostEditor";
import Post from "./post/Post";
import Comment from "./post/Comment";
import CompactPostThread from "./post/CompactPostThread";
import CommentChain from "./post/CommentChain";
import CommentChainEditor from "./post/CommentChainEditor";
import CommentEditor from "./post/CommentEditor";
import NewThread from "./thread/NewThread";
import NewCommentsThread from "./thread/NewCommentsThread";
import CollapsedPlaceholder from "./thread/CollapsedPlaceholder";
import PostingActionButton from "./board/PostingActionButton";
import CycleNewButton from "./board/CycleNewButton";
import Layout from "./layout/Layout";
import CustomCursor from "./layout/CustomCursor";
import { useCompact } from "./utils";
import DefaultTheme from "./theme/default";
import TagsFilterSection from "./board/TagsFilterSection";
import MasonryView from "./feeds/MasonryView";
import PostQuote from "./post/PostQuote";
import UserDetails from "./user/UserDetails";
import BobaDex from "./user/BobaDex";
import { TagType } from "./types";
import { EditorContext } from "@bobaboard/boba-editor";
import SegmentedButton from "./buttons/SegmentedButton";
import LoadingBar from "./common/LoadingBar";
import SettingsContainer from "./layout/SettingsContainer";
import TabsGroup from "./layout/TabsGroup";

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
  PinnedMenu as PinnedBoardsMenu,
  Post,
  PostEditor,
  PostingActionButton,
  Comment,
  CommentChain,
  CommentChainEditor,
  CompactPostThread,
  CommentEditor,
  CycleNewButton,
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
  CustomCursor,
  SettingsContainer,
  TabsGroup,
};

import type { TagsType } from "./types";
import type { PostHandler } from "./post/Post";
import type { CommentHandler } from "./post/Comment";
import type { SideMenuHandler } from "./sidemenu/SideMenu";
import type { SettingType } from "./layout/SettingsContainer";
export type {
  TagsType,
  PostHandler,
  CommentHandler,
  SideMenuHandler,
  SettingType,
};
