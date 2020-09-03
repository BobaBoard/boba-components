// @ts-nocheck
import React from "react";

import Theme from "../theme/default";
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
        className={classnames("avatar", {
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
            <a
              className={classnames("upload")}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (props.loading) {
                  return;
                }
                uploadRef.current.click();
              }}
            >
              Upload New
            </a>
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
      <div className={classnames("user-data")}>
        <div className={classnames("username")}>
          <Input
            id={"username"}
            value={username || props.username}
            label={"Username"}
            onTextChange={(text: string) => setUsername(text)}
            color={props.accentColor || Theme.DEFAULT_ACCENT_COLOR}
            theme={InputStyle.DARK}
            disabled={!props.editing || props.loading}
            onTextChange={setUsername}
          />
        </div>
        <div
          className={classnames("buttons", {
            editing: props.editing,
            loading: props.loading,
          })}
        >
          <div
            className={classnames("button edit-trigger")}
            onClick={() => {
              setAvatarEdited(false);
              props.onEdit();
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
          <div
            className={classnames("button cancel")}
            onClick={() => {
              props.onCancel();
            }}
          >
            <FontAwesomeIcon icon={props.editing ? faCross : faPencilAlt} />
          </div>
          <div
            className={classnames("button save")}
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
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .user-details {
          display: flex;
          position: relative;
          width: 100%;
          margin-bottom: 25px;
        }
        .avatar.loading {
          opacity: 0.8;
        }
        .spinner {
          display: none;
        }
        .avatar.loading .spinner {
          z-index: 5;
          position: relative;
          display: block;
        }
        .avatar {
          position: relative;
          width: ${AREA_SIZE_PX}px;
          height: ${AREA_SIZE_PX}px;
        }
        .avatar.display {
          background-image: url(${props.imageUrl});
          background-position: center;
          background-size: cover;
          border-radius: 50%;
        }
        .user-data {
          flex-grow: 1;
          display: flex;
        }
        .username {
          margin-left: 10px;
          margin-top: 10px;
          flex-grow: 1;
        }
        .upload {
          position: absolute;
          bottom: -20px;
          color: ${props.accentColor || Theme.DEFAULT_ACCENT_COLOR};
          font-size: smaller;
          width: 100%;
          text-align: center;
        }
        .buttons {
          margin-top: 33px;
          margin-left: 10px;
        }
        .buttons.loading .button {
          opacity: 0.8;
          pointer-events: none;
        }
        .buttons.editing {
          transform: translateY(-25%);
        }
        .buttons.editing .edit-trigger {
          display: none;
        }
        .buttons .save,
        .buttons .cancel {
          display: none;
        }
        .buttons.editing .save,
        .buttons.editing .cancel {
          display: block;
        }
        .button.cancel {
          margin-bottom: 5px;
        }
        .button {
          text-align: right;
          width: 25px;
          height: 25px;
          background-color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
          border: 1px solid ${props.accentColor || Theme.DEFAULT_ACCENT_COLOR};
          /*transform: translate(50%, -50%);*/
          position: relative;
          border-radius: 50%;
          color: ${props.accentColor || Theme.DEFAULT_ACCENT_COLOR};
        }
        .button :global(svg) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .button:hover {
          cursor: pointer;
          background-color: ${props.accentColor || Theme.DEFAULT_ACCENT_COLOR};
          border: 1px solid ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
          color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
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
