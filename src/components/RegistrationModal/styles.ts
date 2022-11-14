export const ModalContentStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(max(90vw, 300px))",
  maxWidth: 600,
  background: "var(--block-background)",
  border: "3px solid var(--secondary-main)",
  boxShadow: 24,
  px: 2,
  py: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
export const InputBoxStyle = {
  maxWidth: 400,
  width: "100%",
  mt: 2,
  "@media(max-width: 500px)": { maxWidth: 260 },
};
export const InputStyle = {
  minWidth: 300,
  "@media(max-width: 500px)": { minWidth: "unset", maxWidth: 260 },
  width: "100%",
};