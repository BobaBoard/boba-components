import { Story } from "@storybook/react";

export type StoryArgs<T> = T extends Story<infer S> ? S : never;
export type RequiredStoryArgs<T> = Required<NonNullable<StoryArgs<T>>>;
