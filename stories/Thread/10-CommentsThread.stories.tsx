import Comment, { CommentProps } from "post/Comment";

import { Meta } from "@storybook/react";
import NewCommentsThread from "thread/NewCommentsThread";
import React from "react";
import Theme from "theme/default";
import { action } from "@storybook/addon-actions";
import { editorArgTypes } from "../utils/editor-controls";
import mamoruAvatar from "stories/images/mamoru.png";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";

export default {
  title: "Comment/Comments Thread",
  component: NewCommentsThread,
  argTypes: {
    ...editorArgTypes,
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginLeft: "100px",
            backgroundColor: Theme.LAYOUT_BOARD_BACKGROUND_COLOR,
          }}
        >
          <div
            style={{
              height: Theme.HEADER_HEIGHT_PX,
              backgroundColor: Theme.LAYOUT_HEADER_BACKGROUND_COLOR,
              position: "sticky",
              top: 0,
              color: "white",
            }}
          >
            This Div simulates Boba&rsquo;s sticky header
          </div>
          {Story()}
        </div>
      </div>
    ),
  ],
} as Meta;

const COMMENT_ARGS: CommentProps = {
  comments: [
    {
      id: "b91441ee-a57a-405d-9d69-bbe1d28991c5",
      text: '[{"insert": "[LVL 0] I mean, sure, but you know what also is great?"}]',
    },
    {
      id: "5c420fc4-0093-4cfa-a7a4-b3ed1434e9ca",
      text: '[{"insert": "Deze nuts."}]',
    },
    {
      id: "7678e085-b334-47db-ba59-6bbd5e9e9afb",
      text: '[{"insert": "Wait is that how you type it?"}]',
    },
  ],
  secretIdentity: {
    name: "Tuxedo Mask",
    avatar: `/${tuxedoAvatar}`,
  },
  userIdentity: {
    name: "SexyDaddy69",
    avatar: `/${mamoruAvatar}`,
  },
  createdTime: "At some point",
  onExtraAction: {
    onClick: action("click"),
    label: "onExtraAction trigger",
  },
};

export const SingleThread = () => {
  const [additionalComments, setAdditionalComments] = React.useState(0);
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          zIndex: 100,
        }}
      >
        <button
          onClick={() => setAdditionalComments((comments) => comments + 1)}
        >
          Add Comments
        </button>
        <button
          onClick={() => setAdditionalComments((comments) => comments - 1)}
        >
          Remove Comments
        </button>
      </div>
      <NewCommentsThread>
        {(setBoundaryElement) => (
          <>
            <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
              <Comment
                ref={(ref) =>
                  setBoundaryElement(ref?.avatarRef?.current || null)
                }
                {...COMMENT_ARGS}
              />
            </div>
            <NewCommentsThread.Indent id="b38feb96-97f9-4cd0-81e6-5ab8d85e91a7">
              <NewCommentsThread.Item>
                {(setBoundaryElement) => (
                  <Comment
                    ref={(ref) =>
                      setBoundaryElement(ref?.avatarRef?.current || null)
                    }
                    {...COMMENT_ARGS}
                  />
                )}
              </NewCommentsThread.Item>
              {additionalComments > 0 && (
                <NewCommentsThread.Item>
                  {(setBoundaryElement) => (
                    <>
                      <Comment
                        ref={(ref) =>
                          setBoundaryElement(ref?.avatarRef?.current || null)
                        }
                        {...COMMENT_ARGS}
                      />
                      {additionalComments > 1 && (
                        <NewCommentsThread.Indent id="905134c2-7507-430e-9df7-e24fa4e7ae89">
                          <NewCommentsThread.Item>
                            {(setBoundaryElement) => (
                              <>
                                <Comment
                                  ref={(ref) =>
                                    setBoundaryElement(
                                      ref?.avatarRef?.current || null
                                    )
                                  }
                                  {...COMMENT_ARGS}
                                />
                                <NewCommentsThread.Indent id="1cf9d71f-fd9f-4288-a5a5-319fff983899">
                                  <NewCommentsThread.Item>
                                    {(setBoundaryElement) => (
                                      <Comment
                                        ref={(ref) =>
                                          setBoundaryElement(
                                            ref?.avatarRef?.current || null
                                          )
                                        }
                                        {...COMMENT_ARGS}
                                      />
                                    )}
                                  </NewCommentsThread.Item>
                                </NewCommentsThread.Indent>
                              </>
                            )}
                          </NewCommentsThread.Item>
                        </NewCommentsThread.Indent>
                      )}
                    </>
                  )}
                </NewCommentsThread.Item>
              )}
              <NewCommentsThread.Item>
                {(setBoundaryElement) => (
                  <>
                    <Comment
                      ref={(ref) =>
                        setBoundaryElement(ref?.avatarRef?.current || null)
                      }
                      {...COMMENT_ARGS}
                    />
                    <NewCommentsThread.Indent id="79cd1e8e-924d-4073-9378-835e877129ba">
                      <NewCommentsThread.Item>
                        {(setBoundaryElement) => (
                          <>
                            <Comment
                              ref={(ref) =>
                                setBoundaryElement(
                                  ref?.avatarRef?.current || null
                                )
                              }
                              {...COMMENT_ARGS}
                            />
                            <NewCommentsThread.Indent id="7b5a4e6d-5767-4133-a5c1-174b3e428dd0">
                              <NewCommentsThread.Item>
                                {(setBoundaryElement) => (
                                  <>
                                    <Comment
                                      ref={(ref) =>
                                        setBoundaryElement(
                                          ref?.avatarRef?.current || null
                                        )
                                      }
                                      {...COMMENT_ARGS}
                                    />
                                    {additionalComments > 2 && (
                                      <NewCommentsThread.Indent id="ccfd32e1-b09a-4627-947c-a301e91a0d2b">
                                        <NewCommentsThread.Item>
                                          {(setBoundaryElement) => (
                                            <Comment
                                              ref={(ref) =>
                                                setBoundaryElement(
                                                  ref?.avatarRef?.current ||
                                                    null
                                                )
                                              }
                                              {...COMMENT_ARGS}
                                            />
                                          )}
                                        </NewCommentsThread.Item>
                                      </NewCommentsThread.Indent>
                                    )}
                                  </>
                                )}
                              </NewCommentsThread.Item>
                            </NewCommentsThread.Indent>
                          </>
                        )}
                      </NewCommentsThread.Item>
                    </NewCommentsThread.Indent>
                  </>
                )}
              </NewCommentsThread.Item>
              <NewCommentsThread.Item>
                {(setBoundaryElement) => (
                  <Comment
                    ref={(ref) =>
                      setBoundaryElement(ref?.avatarRef?.current || null)
                    }
                    {...COMMENT_ARGS}
                  />
                )}
              </NewCommentsThread.Item>
            </NewCommentsThread.Indent>
          </>
        )}
      </NewCommentsThread>
    </div>
  );
};

export const MultipleThreads = () => {
  const [threads, setAdditionalThreads] = React.useState([{}]);
  const [disableMotionEffect, setDisableMotionEffect] = React.useState(false);
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          zIndex: 100,
        }}
      >
        <button onClick={() => setAdditionalThreads([...threads, {}])}>
          Add Thread
        </button>
        <button onClick={() => setDisableMotionEffect(!disableMotionEffect)}>
          Toggle Motion
        </button>
      </div>
      {threads.map((_, index) => (
        <NewCommentsThread
          key={index}
          disableMotionEffect={disableMotionEffect}
        >
          {(setBoundaryElement) => (
            <>
              <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
                <Comment
                  ref={(ref) =>
                    setBoundaryElement({
                      positionX: ref?.avatarRef?.current || undefined,
                      positionY: ref?.headerRef?.current || undefined,
                    })
                  }
                  {...COMMENT_ARGS}
                />
              </div>
              <NewCommentsThread.Indent id="33593297-1904-4e21-ad89-d799491f177b">
                <NewCommentsThread.Item>
                  {(setBoundaryElement) => (
                    <Comment
                      ref={(ref) =>
                        setBoundaryElement({
                          positionX: ref?.avatarRef?.current || undefined,
                          positionY: ref?.headerRef?.current || undefined,
                        })
                      }
                      {...COMMENT_ARGS}
                    />
                  )}
                </NewCommentsThread.Item>
                <NewCommentsThread.Item>
                  {(setBoundaryElement) => (
                    <>
                      <Comment
                        ref={(ref) =>
                          setBoundaryElement({
                            positionX: ref?.avatarRef?.current || undefined,
                            positionY: ref?.headerRef?.current || undefined,
                          })
                        }
                        {...COMMENT_ARGS}
                      />
                      <NewCommentsThread.Indent id="8b94cdc7-0337-4f3a-b4c5-f1d71ba25561">
                        <NewCommentsThread.Item>
                          {(setBoundaryElement) => (
                            <>
                              <Comment
                                ref={(ref) =>
                                  setBoundaryElement({
                                    positionX:
                                      ref?.avatarRef?.current || undefined,
                                    positionY:
                                      ref?.headerRef?.current || undefined,
                                  })
                                }
                                {...COMMENT_ARGS}
                              />
                              <NewCommentsThread.Indent id="8f9dd764-6721-4f41-b3a1-675c633f52ae">
                                <NewCommentsThread.Item>
                                  {(setBoundaryElement) => (
                                    <>
                                      <Comment
                                        ref={(ref) =>
                                          setBoundaryElement({
                                            positionX:
                                              ref?.avatarRef?.current ||
                                              undefined,
                                            positionY:
                                              ref?.headerRef?.current ||
                                              undefined,
                                          })
                                        }
                                        {...COMMENT_ARGS}
                                      />
                                    </>
                                  )}
                                </NewCommentsThread.Item>
                              </NewCommentsThread.Indent>
                            </>
                          )}
                        </NewCommentsThread.Item>
                      </NewCommentsThread.Indent>
                    </>
                  )}
                </NewCommentsThread.Item>
                <NewCommentsThread.Item>
                  {(setBoundaryElement) => (
                    <Comment
                      ref={(ref) =>
                        setBoundaryElement({
                          positionX: ref?.avatarRef?.current || undefined,
                          positionY: ref?.headerRef?.current || undefined,
                        })
                      }
                      {...COMMENT_ARGS}
                    />
                  )}
                </NewCommentsThread.Item>
              </NewCommentsThread.Indent>
            </>
          )}
        </NewCommentsThread>
      ))}
    </div>
  );
};
