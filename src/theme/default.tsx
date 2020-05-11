const DefaultTheme: ThemeProperties = {
  LAYOUT_BOARD_BACKGROUND_COLOR: "#2f2f30",
  POPOVER_DEFAULT_BACKGROUND: "#1c1c1c",
  POST_HEADER_DATE_COLOR: "#2f2f30",
  POST_BACKGROUND_COLOR: "white",
};

export default DefaultTheme;

export interface ThemeProperties {
  LAYOUT_BOARD_BACKGROUND_COLOR: string;
  POPOVER_DEFAULT_BACKGROUND: string;
  POST_HEADER_DATE_COLOR: string;
  POST_BACKGROUND_COLOR: string;
}
