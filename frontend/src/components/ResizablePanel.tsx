import { Box } from "@chakra-ui/react";
import { useState, useRef, useCallback, useEffect } from "react";

interface ResizablePanelProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  initialTopHeight: number; // Percentage
  onHeightChange?: (height: number) => void;
  minTopHeight?: number; // Percentage
  maxTopHeight?: number; // Percentage
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  topContent,
  bottomContent,
  initialTopHeight = 50,
  onHeightChange,
  minTopHeight = 20,
  maxTopHeight = 80,
}) => {
  const [topHeight, setTopHeight] = useState(initialTopHeight);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newTopHeight =
        ((e.clientY - containerRect.top) / containerRect.height) * 100;

      // Clamp the height between min and max
      const clampedHeight = Math.min(
        Math.max(newTopHeight, minTopHeight),
        maxTopHeight
      );

      setTopHeight(clampedHeight);
      onHeightChange?.(clampedHeight);
    },
    [isDragging, minTopHeight, maxTopHeight, onHeightChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <Box
      ref={containerRef}
      h="100%"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      {/* Top Panel */}
      <Box
        height={`${topHeight}%`}
        minHeight={`${minTopHeight}%`}
        maxHeight={`${maxTopHeight}%`}
        overflow="hidden"
        borderBottom="1px"
        borderColor="gray.200"
      >
        {topContent}
      </Box>

      {/* Resize Handle */}
      <Box
        height="8px"
        bg="gray.100"
        borderY="1px"
        borderColor="gray.200"
        cursor="ns-resize"
        onMouseDown={handleMouseDown}
        position="relative"
        _hover={{ bg: "gray.200" }}
        _active={{ bg: "blue.200" }}
        transition="background-color 0.2s"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Resize indicator */}
        <Box
          width="40px"
          height="4px"
          bg="gray.400"
          borderRadius="2px"
          _hover={{ bg: "gray.500" }}
          transition="background-color 0.2s"
        />
      </Box>

      {/* Bottom Panel */}
      <Box flex={1} minHeight={`${100 - maxTopHeight}%`} overflow="hidden">
        {bottomContent}
      </Box>
    </Box>
  );
};

export default ResizablePanel;
