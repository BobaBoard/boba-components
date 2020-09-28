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

export interface TagsType {
  name: string;
  color?: string;
  indexable?: boolean;
  category?: boolean;
  contentWarning?: boolean;
}

export interface DescriptionType {
  index: number;
  title: string;
  type: "text" | "category_filter";
  description?: string;
  categories?: string[];
}

export interface LinkWithAction {
  href?: string;
  onClick: () => void;
}
