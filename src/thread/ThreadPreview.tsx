import { Post, PostHandler, TagType, TagsType } from "@bobaboard/ui-components";
import { PostData, ThreadSummaryType } from "types/Types";
import { PostOptions, usePostOptions } from "components/options/usePostOptions";
import {
  addThreadHandlerRef,
  removeThreadHandlerRef,
} from "utils/scroll-utils";

import React from "react";
import { THREAD_VIEW_OPTIONS } from "components/core/editors/utils";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import noop from "noop-ts";
import { useCachedLinks } from "../../hooks/useCachedLinks";
import { useCurrentRealmBoardId } from "contexts/RealmContext";
import { useForceHideIdentity } from "../../hooks/useForceHideIdentity";
import { useSetThreadHidden } from "lib/api/hooks/thread";
import { withEditors } from "components/core/editors/withEditors";


const HiddenThread: React.FC<{
  thread: ThreadSummaryType;
}> = ({ thread }) => {
  const setThreadHidden = useSetThreadHidden();
  return (
    <div className="post hidden" key={thread.id}>
      This thread was hidden{" "}
      <a
        href="#"
        onClick={(e) => {
          setThreadHidden({
            threadId: thread.id,
            boardId: thread.parentBoardId,
            hide: !thread.hidden,
          });
          e.preventDefault();
        }}
      >
        [unhide]
      </a>
      <style jsx>{`
        .post.hidden {
          margin: 0 auto;
          max-width: 500px;
          width: calc(100% - 40px);
          background-color: gray;
          padding: 20px;
          border: 1px dashed black;
          border-radius: 15px;
        }
      `}</style>
    </div>
  );
};
