import { MouseEvent } from "react";

export interface SecretIdentityType {
  id?: string;
  avatar: string;
  name: string;
  color?: string;
  accessory?: string;
}

export interface AccessoryType {
  id?: string;
  name: string;
  accessory: string;
}

export interface PostDetailsType {
  text: string;
  createdTime: string;
  secretIdentity: SecretIdentityType;
  userIdentity?: {
    avatar: string;
    name: string;
  };
  newPost?: boolean;
  newComments?: number;
  newContributions?: number;
  tags?: {
    contentWarnings: string[];
    categoryTags: string[];
    whisperTags: string[];
    indexTags: string[];
  };
}

export enum TagType {
  INDEXABLE,
  CONTENT_WARNING,
  CATEGORY,
  WHISPER,
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

export interface FilterDescriptionType {
  id: string;
  index: number;
  title: string;
  type: "category_filter";
  categories: string[];
}

export type DescriptionType = TextDescriptionType | FilterDescriptionType;

export interface LinkWithAction {
  href?: string;
  onClick?: (e?: MouseEvent) => void;
}

export interface BoardType {
  slug: string;
  avatar: string;
  description: string;
  color: string;
  updates?: number | boolean;
  outdated?: boolean;
  muted?: boolean;
  link: LinkWithAction;
}
