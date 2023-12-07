import { MouseEvent } from "react";

export interface SecretIdentityType {
  id?: string;
  avatar: string;
  name: string;
  color?: string | null;
  accessory?: string | null;
}

export interface UserIdentityType {
  avatar: string;
  name: string;
}

export interface AccessoryType {
  id?: string;
  name: string;
  accessory: string;
}

export interface TagsListType {
  contentWarnings: string[];
  categoryTags: string[];
  whisperTags: string[];
  indexTags: string[];
}

export interface PostDetailsType {
  text: string;
  createdTime: string;
  secretIdentity: SecretIdentityType;
  userIdentity?: UserIdentityType;
  newPost?: boolean;
  newComments?: number;
  newContributions?: number;
  tags?: TagsListType;
}

export enum TagType {
  INDEXABLE = "INDEXABLE",
  CONTENT_WARNING = "CONTENT_WARNING",
  CATEGORY = "CATEGORY",
  WHISPER = "WHISPER",
}

export interface TagsType {
  name: string;
  type: TagType;
  color?: string;
  accentColor?: string;
  // TODO: remove these booleans and use type up there
  indexable?: boolean;
  category?: boolean;
  contentWarning?: boolean;
}

export interface BoardMetadataType {
  slug: string;
  avatarUrl: string;
  tagline: string;
  accentColor: string;
  descriptions: DescriptionType[];
  muted?: boolean;
}

export interface TextDescriptionType {
  id: string;
  index: number;
  title: string;
  type: "text";
  description: string;
}

export interface CategoryFilterDescriptionType {
  id: string;
  index: number;
  title: string;
  type: "category_filter";
  categories: string[];
}

export type DescriptionType =
  | TextDescriptionType
  | CategoryFilterDescriptionType;

/**
 * A link handler that can behave differently according to
 * whether a href or an onClick (or both) are passed.
 *
 * Used to enable anchor and buttons to behave as people expect,
 * optionally enabling things like "open URL in a new window" even
 * for buttons that have a distinct onClick action.
 */
export interface LinkWithAction<T = MouseEvent> {
  href?: string;
  onClick?: (e?: T) => void;
  label?: string;
}

export interface BoardDataType {
  slug: string;
  avatar: string;
  color: string;
}

// TODO: rename this to something more specific.
export interface BoardType extends BoardDataType {
  description: string;
  updates?: number | boolean;
  outdated?: boolean;
  muted?: boolean;
  link: LinkWithAction;
}
