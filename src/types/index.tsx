export interface PostDetailsType {
  text: string;
  createdTime: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  newPost?: boolean;
  newComments?: number;
  newContributions?: number;
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
  onClick: () => void;
}
