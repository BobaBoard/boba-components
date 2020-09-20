// @ts-nocheck
import React from "react";

import Theme from "../theme/default";
import Button, { ButtonStyle } from "../common/Button";
import Input, { InputStyle } from "../common/Input";
import Cropper from "react-easy-crop";
import Pica from "pica";
import Spinner from "../common/Spinner";
import {
  faPencilAlt,
  faCross,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

import debug from "debug";
const log = debug("bobaui:userDetails-log");

const AREA_SIZE_PX = 100;

const getMinZoomLevel = (mediaSize: any) => {
  const { height, width } = getObjectFitSize(
    true,
    100,
    100,
    mediaSize.naturalWidth,
    mediaSize.naturalHeight
  );

  return Math.max(100 / height, 100 / width);
};
const pica = new Pica();
const UserDetails: React.FC<UserDetailsProps> = (props) => {
  const [avatarEdited, setAvatarEdited] = React.useState(false);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [username, setUsername] = React.useState("");
  const [mediaSize, setMediaSize] = React.useState(null);
  const uploadRef = React.createRef<HTMLInputElement>();
  const [newImage, setNewImage] = React.useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  return (
    <div className={classnames("user-details", { editing: props.editing })}>
      <div
        className={classnames("buttons", {
          editing: props.editing,
          loading: props.loading,
        })}
      >
        <div className="edit-trigger">
          <Button
            theme={ButtonStyle.DARK}
            color="#f96680"
            icon={faPencilAlt}
            onClick={() => {
              setAvatarEdited(false);
              props.onEdit();
            }}
          >
            Edit information
          </Button>
        </div>

        <div className="cancel">
          <Button
            theme={ButtonStyle.DARK}
            icon={faCross}
            onClick={() => {
              props.onCancel();
            }}
          >
            Cancel
          </Button>
        </div>

        <div className="save">
          <Button
            theme={ButtonStyle.DARK}
            icon={faCheck}
            onClick={() => {
              log(avatarEdited);
              props.onSubmit(
                new Promise((resolve) => {
                  if (avatarEdited) {
                    getCroppedImg(
                      newImage || props.imageUrl,
                      croppedAreaPixels
                    ).then((result) => {
                      resolve({
                        editedImg: result,
                        username: username || props.username,
                      });
                    });
                  } else {
                    resolve({
                      editedImg: props.imageUrl,
                      username: username || props.username,
                    });
                  }
                })
              );
            }}
          >
            Save
          </Button>
        </div>
      </div>

      <section className={classnames("user-data")}>
        <h3>Username</h3>
        <div className={classnames("username")}>
          {props.editing ? (
            <Input
              id={"username"}
              value={username || props.username}
              onTextChange={(text: string) => setUsername(text)}
              theme={InputStyle.DARK}
              disabled={!props.editing || props.loading}
              onTextChange={setUsername}
            />
          ) : (
            <div className="username-text">{props.username}</div>
          )}
        </div>
      </section>
      <section>
        <h3>Avatar</h3>
        <div
          className={classnames("avatar-wrapper", {
            display: !props.editing,
            editable: !props.editable,
            loading: props.loading,
          })}
        >
          {props.editing && (
            <>
              <div className={"spinner"}>
                <Spinner />
              </div>
              <div
                className={classnames("avatar-editor", {
                  loading: props.loading,
                })}
              >
                <Cropper
                  image={newImage || props.imageUrl}
                  crop={crop}
                  zoom={zoom}
                  cropSize={{ width: AREA_SIZE_PX, height: AREA_SIZE_PX }}
                  aspect={1}
                  maxZoom={100}
                  cropShape="round"
                  onCropChange={(crop) => {
                    if (props.loading) {
                      return;
                    }
                    setCrop(crop);
                  }}
                  onZoomChange={(zoom) => {
                    if (props.loading) {
                      return;
                    }
                    const currentWidth = mediaSize.width * zoom;
                    const currentHeight = mediaSize.height * zoom;
                    if (
                      currentWidth < AREA_SIZE_PX ||
                      currentHeight < AREA_SIZE_PX
                    ) {
                      // reset zoom to minimum
                      log(crop);
                      const isPortrait = mediaSize.width < mediaSize.height;
                      setZoom(getMinZoomLevel(mediaSize));
                      setCrop({
                        x: isPortrait ? 0 : crop.x,
                        y: isPortrait ? crop.y : 0,
                      });
                      return;
                    }
                    setZoom(zoom);
                  }}
                  onCropComplete={(croppedArea, croppedAreaPixels) => {
                    setCroppedAreaPixels(croppedAreaPixels);
                  }}
                  onMediaLoaded={(mediaSize) => {
                    setMediaSize(mediaSize);
                    if (zoom == 1) {
                      setZoom(getMinZoomLevel(mediaSize));
                    }
                  }}
                  onInteractionStart={() => {
                    setAvatarEdited(true);
                  }}
                />
              </div>
              <div className="upload">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    if (props.loading) {
                      return;
                    }
                    uploadRef.current.click();
                  }}
                >
                  Upload new
                </Button>
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                ref={uploadRef}
                accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
                onChange={(e) => {
                  const fileInput = e.target;
                  if (fileInput.files != null && fileInput.files[0] != null) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      if (!e.target?.result) {
                        return;
                      }
                      setNewImage(e.target.result);
                      setAvatarEdited(true);
                      fileInput.value = "";
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                  }
                }}
              />
            </>
          )}
        </div>
      </section>
      <style jsx>{`
        .user-details {
          position: relative;
          width: 100%;
          margin-bottom: 25px;
          color: white;
        }

        .user-details * {
          box-sizing: border-box;
        }

        .user-details > section {
          width: 100%;
          border-radius: 10px;
          background-color: #3a3a3c;
          padding: 20px;
        }

        .user-details > section + section {
          margin-top: 20px;
        }

        .user-details > section > h3 {
          line-height: 36px;
          font-size: 16px;
          margin: 0;
        }

        .avatar-editor.loading {
          opacity: 0.5;
        }
        .spinner {
          display: none;
        }
        .avatar-wrapper.loading .spinner {
          z-index: 5;
          position: absolute;
          display: block;
          transform: scale(0.6);
        }

        .avatar-editor {
          width: ${AREA_SIZE_PX}px;
          height: ${AREA_SIZE_PX}px;
          position: relative;
        }

        .avatar-wrapper.display {
          background-image: url(${props.imageUrl});
          background-position: center;
          background-size: cover;
          width: ${AREA_SIZE_PX}px;
          height: ${AREA_SIZE_PX}px;
          border-radius: 50%;
        }

        .upload {
          width: 100%;
          margin-top: 10px;
        }
        .buttons {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .buttons.loading .button {
          opacity: 0.8;
          pointer-events: none;
        }
        .buttons.editing .edit-trigger {
          display: none;
        }
        .buttons .save,
        .buttons .cancel {
          display: none;
          margin-left: 10px;
        }
        .buttons.editing .save,
        .buttons.editing .cancel {
          display: block;
        }

        .username-text {
          line-height: 36px;
          font-size: 20px;
          font-weight: bold;
        }
        
          .user-details > section {
            display: flex;
            flex-wrap: wrap;
          }

          .user-details > section > h3 {
            flex-shrink: 0;
            min-width: 200px;
          }

          .username {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export interface UserDetailsProps {
  imageUrl: string;
  username: string;
  editable?: boolean;
  editing?: boolean;
  accentColor?: string;
  onEdit?: () => void;
  onCancel?: () => void;
  onSubmit?: (
    result: Promise<{
      editedImg: string;
      username: string;
    }>
  ) => void;
  loading?: boolean;
}

export default UserDetails;

function getObjectFitSize(
  contains /* true = contain, false = cover */,
  containerWidth,
  containerHeight,
  width,
  height
) {
  var doRatio = width / height;
  var cRatio = containerWidth / containerHeight;
  var targetWidth = 0;
  var targetHeight = 0;
  var test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
    targetHeight = containerHeight;
    targetWidth = targetHeight * doRatio;
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2,
  };
}

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });
/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = (await createImage(imageSrc)) as HTMLImageElement;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  0;
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated im0.2age and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  const canvas2 = document.createElement("canvas");
  canvas2.width = 100;
  canvas2.height = 100;

  // As Base64 string
  return (await pica.resize(canvas, canvas2)).toDataURL("image/jpeg");
}
