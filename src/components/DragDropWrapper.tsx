import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavItem from "./NavItem";
import { NavItem as NavItemType } from "../utils/api";

interface DragDropWrapperProps {
  items: NavItemType[];
  setItems: (items: NavItemType[]) => void;
  isEditing: boolean;
}

export default function DragDropWrapper({
  items,
  // setItems,
  isEditing,
}: DragDropWrapperProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item, index) => (
        <NavItem
          key={item.id}
          item={item}
          index={index}
          moveItem={() => {}}
          isEditing={isEditing}
        />
      ))}
    </DndProvider>
  );
}
