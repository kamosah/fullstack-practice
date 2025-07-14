import Box from "@mui/material/Box";
import { MdDragHandle } from "react-icons/md";

/**
 * Custom resize handle component for react-resizable-panels
 * Provides a visual indicator with hover and active states
 */

const DragResizeHandle: React.FC = () => (
  <Box
    sx={{
      position: "relative",
      height: 4,
      bgcolor: "grey.200",
      cursor: "row-resize",
      transition: "background-color 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        bgcolor: "primary.light",
      },
      "&:active": {
        bgcolor: "primary.main",
      },
    }}
  >
    <Box
      sx={{
        position: "absolute",
        bgcolor: "grey.400",
        borderRadius: 999,
        width: 24,
        height: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        "&:hover": {
          bgcolor: "primary.dark",
        },
        "&:active": {
          bgcolor: "primary.main",
        },
      }}
    >
      <MdDragHandle size={16} color="white" />
    </Box>
  </Box>
);

export default DragResizeHandle;
