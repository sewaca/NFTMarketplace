// Components & Pages :
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { IBlock, handleServerResponse } from "./handleServerResponse";
import DeleteIcon from "@mui/icons-material/Delete";
import DragNDropUploader from "./DragNDropUploader";
// Hooks :
import useApiMutation from "../../hooks/useApiMutation";
import { useEthers } from "@usedapp/core";
import { useSnackbar } from "notistack";
import { useState } from "react";
// Other:
import API from "../../API/API";
// CSS :
import styles from "./create-nft.module.css";

export default function CreateNFT() {
  const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);
  const [maxPartsAmount, setMaxPartsAmount] = useState(1000);
  const [partsAmount, setPartsAmount] = useState(4);
  const [title, setTitle] = useState("");
  // uploadedPreview - base64 строка, генерируемая после того, как пользователь загрузил картинку
  const [uploadedPreview, setUploadedPreview] = useState("");
  // Позволяет выводить сообщения пользователю в виде
  const { enqueueSnackbar } = useSnackbar();
  const { loading, data, send } = useApiMutation();
  const { account } = useEthers();

  // Проверка и отправка данных
  const sendDataClickHandler = () => {
    // Если пользователь не вошел в аккаунт
    if (!account)
      return enqueueSnackbar("Пожалуйста, войдите в аккаунт", {
        variant: "error",
      });

    if (!title)
      return enqueueSnackbar("Пожалуйста, введите название коллекции", {
        variant: "error",
      });
    // Проверяем правильность введенных пользователем данных
    if (!uploadedFiles[0])
      return enqueueSnackbar("Пожалуйста, загрузите картинку", {
        variant: "error",
      });
    // Если пользователь выбрал слишком много частей (больше чем пикселей в картинке)
    if (partsAmount > maxPartsAmount)
      return enqueueSnackbar(
        "Слишком большое количество частей для деления картинки",
        { variant: "error" }
      );
    if (!partsAmount)
      return enqueueSnackbar(
        "Пожалуйста, укажите верное количество частей для деления картинки",
        { variant: "error" }
      );
    // Если данные введены пользователем верно, то отправляем запрос на backend
    const fr = new FileReader();
    fr.readAsDataURL(uploadedFiles[0]);
    fr.onloadend = () => {
      send(() =>
        API.sendImage({
          nblocks: partsAmount,
          src: fr.result?.toString() || "",
          wallet: account,
          title: title,
        })
          .then((res) => res.json())
          .then((res) => {
            if (!res.blocks.length)
              throw new Error("Didn't got blocks from server");
            return handleServerResponse(res);
          })
      );
    };
  };

  return (
    <Box className={styles.PageBox}>
      {!loading && data.blocks?.length ? (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Коллекция успешно выпущена.
          </Typography>
          <div
            className={styles.PageBox__ResponseGrid}
            style={{
              gridTemplateColumns: `repeat(${data.imageInfo?.cols || 1}, 1fr)`,
            }}
          >
            {data.blocks.map((row: Array<IBlock>) =>
              row.map((cell) => (
                <img
                  key={cell.id}
                  src={cell.base64}
                  width={cell.width}
                  alt=""
                />
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Выпустить свою коллекцию
          </Typography>
          {uploadedFiles.length ? (
            <Box className={styles.Rectangle}>
              <IconButton
                color="primary"
                onClick={(e) => setUploadedFiles([])}
                className={styles.Rectangle__removeButton}
              >
                <DeleteIcon />
              </IconButton>
              <img
                src={uploadedPreview || ""}
                className={styles.Rectangle__image}
                alt=""
              />
            </Box>
          ) : (
            <Box>
              <DragNDropUploader
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                setUploadedPreview={setUploadedPreview}
                setMaxPartsAmount={setMaxPartsAmount}
              />
            </Box>
          )}
          <TextField
            sx={{ my: 3, minWidth: 280 }}
            label={<Typography variant="body2">Название коллекции</Typography>}
            color="secondary"
            variant="standard"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={{ mb: 3, minWidth: 280 }}
            label={
              <Typography variant="body2">
                На сколько частей поделить картинку?
              </Typography>
            }
            color="secondary"
            variant="standard"
            type="text"
            value={partsAmount}
            onChange={(e) =>
              setPartsAmount(
                Math.min(
                  +(e.target.value.match(/\d/g)?.join("") || ""),
                  maxPartsAmount
                )
              )
            }
          />
          <Button
            variant="contained"
            onClick={sendDataClickHandler}
            disabled={loading}
            size="large"
            className={
              styles.PageBox__submitButton +
              " " +
              (loading ? styles.LoadingButton : "")
            }
          >
            <Typography variant="body1" sx={{ zIndex: 1 }}>
              Выпустить
            </Typography>
            {loading && (
              <CircularProgress
                color="info"
                size={22}
                sx={{ ml: 1, zIndex: 1 }}
              />
            )}
          </Button>
        </>
      )}
    </Box>
  );
}
