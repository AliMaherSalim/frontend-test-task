import { ListItem, ListItemText, Switch, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { NavItem as NavItemType } from "../utils/api";

interface NavItemProps {
  item: NavItemType;
  index: number;
  moveItem: (from: number, to: number) => void;
  isEditing: boolean;
}

export default function NavItem({ item, isEditing }: NavItemProps) {
  return (
    <ListItem>
      <ListItemText primary={item.title} />
      {isEditing && (
        <>
          <Switch checked={item.visible !== false} />
          <IconButton>
            <EditIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
}
