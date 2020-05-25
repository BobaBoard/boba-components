import "resize-observer-polyfill";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import BoardFeed from "./board/BoardFeed";
import SideMenu from "./SideMenu";
import Button from "./common/Button";
import Modal from "./common/Modal";
import PostEditor from "./post/PostEditor";
import Post from "./post/Post";
import Comment from "./post/Comment";
import ThreadIndent from "./post/ThreadIndent";
import PostingActionButton from "./board/PostingActionButton";
import Layout from "./Layout";

export {
  Layout,
  BoardFeed,
  Button,
  SideMenu,
  Modal,
  Post,
  PostEditor,
  PostingActionButton,
  Comment,
  ThreadIndent,
};
