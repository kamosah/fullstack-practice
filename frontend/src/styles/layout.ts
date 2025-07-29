const SIDEBAR_WIDTH = 320;

export const Layout = {
  chatInputHeight: 105,
  mainContentWidth: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
  sidebarWidth: `${SIDEBAR_WIDTH}px`,
} as const;

export const ResponsiveChatWidth = {
  xs: `calc(${Layout.mainContentWidth} * 0.9)`,
  sm: `calc(${Layout.mainContentWidth} * 0.8)`,
  md: `calc(${Layout.mainContentWidth} * 0.6667)`,
  lg: `calc(${Layout.mainContentWidth} * 0.6667)`,
  xl: `calc(${Layout.mainContentWidth} * 0.6667)`,
};
