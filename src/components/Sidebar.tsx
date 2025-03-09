import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
  Box,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const initialNavItems = [
  { id: 1, title: "Dashboard", visible: true },
  { id: 2, title: "Job Application", visible: true },
  { id: 3, title: "Qualifications", visible: true },
  { id: 4, title: "About", visible: true },
  { id: 5, title: "Contact", visible: true },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [navItems, setNavItems] = useState(initialNavItems);
  const [editMode, setEditMode] = useState(false);
  const [editedItems, setEditedItems] = useState<{ [key: number]: string }>({});
  const [isClient, setIsClient] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnd = (event: any) => {
    if (!editMode) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = navItems.findIndex((item) => item.id === active.id);
    const newIndex = navItems.findIndex((item) => item.id === over.id);
    setNavItems(arrayMove(navItems, oldIndex, newIndex));
  };

  const toggleVisibility = (id: number) => {
    setNavItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const startEditing = (id: number, title: string) => {
    setEditedItems((prev) => ({ ...prev, [id]: title }));
  };

  const saveEdit = () => {
    setNavItems((prev) =>
      prev.map((item) =>
        editedItems[item.id] !== undefined
          ? { ...item, title: editedItems[item.id] }
          : item
      )
    );
    setEditedItems({});
    setEditMode(false);
  };

  const cancelEdit = () => {
    setEditedItems({});
    setEditMode(false);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: 350,
          padding: 2,
          top: { md: 87 },
        },
      }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}>
        {isMobile && (
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
        <strong>Menu</strong>
        <IconButton onClick={() => setEditMode(!editMode)}>
          {editMode ? (
            <Box>
              <IconButton onClick={saveEdit}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={cancelEdit}>
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={() => setEditMode(true)}>
              <SettingsIcon />
            </IconButton>
          )}
        </IconButton>
      </Box>
      {isClient && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <SortableContext
            items={navItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}>
            <List>
              {navItems.map((item) => (
                <SortableItem key={item.id} id={item.id} editMode={editMode}>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    {editedItems[item.id] !== undefined ? (
                      <TextField
                        value={editedItems[item.id]}
                        onChange={(e) =>
                          setEditedItems((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        size="small"
                        sx={{ flexGrow: 1, marginLeft: 1 }}
                      />
                    ) : (
                      <ListItemText
                        primary={item.title}
                        sx={{
                          opacity: item.visible ? 1 : 0.5,
                          flexGrow: 1,
                          marginLeft: editMode ? 1 : 0,
                        }}
                      />
                    )}
                    {editMode && editedItems[item.id] === undefined && (
                      <>
                        <IconButton onClick={() => toggleVisibility(item.id)}>
                          {item.visible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                        <IconButton
                          onClick={() => startEditing(item.id, item.title)}>
                          <EditIcon />
                        </IconButton>
                      </>
                    )}
                  </ListItem>
                </SortableItem>
              ))}
            </List>
          </SortableContext>
        </DndContext>
      )}
    </Drawer>
  );
}
