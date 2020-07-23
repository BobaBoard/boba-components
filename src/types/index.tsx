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
}
