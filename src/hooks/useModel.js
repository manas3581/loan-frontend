import { useState } from "react";
const sureStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  padding: 5,
  transition: "transform 0.3s ease-in-out",
};
const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return { sureStyle, open, handleOpen, handleClose, setOpen };
};

export default useModal;
