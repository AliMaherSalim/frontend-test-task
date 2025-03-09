import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { ListItem, IconButton } from "@mui/material";

export default function SortableItem({
  id,
  children,
  editMode,
}: {
  id: number;
  children: React.ReactNode;
  editMode: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <ListItem
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: editMode ? "grab" : "default",
      }}>
      {editMode && (
        <IconButton {...listeners} sx={{ cursor: "grab" }}>
          <DragIndicatorIcon />
        </IconButton>
      )}
      {children}
    </ListItem>
  );
}
