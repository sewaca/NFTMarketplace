import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import API from "../../API/API";
import useApiMutation from "../../hooks/useApiMutation";
import styles from "./create-nft.module.css";
import DragNDropUploader from "./DragNDropUploader";
import { handleServerResponse, IBlock } from "./handleServerResponse";

interface CreateNFTProps {}

// FIXME:
type FIXME = any;

export default function CreateNFT({}: CreateNFTProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);
  const [maxPartsAmount, setMaxPartsAmount] = useState(1000);
  const [partsAmount, setPartsAmount] = useState(4);
  // uploadedPreview - base64 строка, генерируемая после того, как пользователь загрузил картинку
  const [uploadedPreview, setUploadedPreview] = useState("");
  // Позволяет выводить сообщения пользователю в виде
  const { enqueueSnackbar } = useSnackbar();

  const { loading, data, error, send } = useApiMutation();

  const sendDataClickHandler = () => {
    // Проверяем правильность введенных пользователем данных
    if (!uploadedFiles[0])
      return enqueueSnackbar("Пожалуйста, загрузите картинку", {
        variant: "error",
      });
    // Если пользователь выбрал слишком много частей (больше чем пикселей в картинке)
    if (partsAmount > maxPartsAmount)
      return enqueueSnackbar(
        "Слишком большое количество частей для деления картинки.",
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
      send(
        API.sendImage({
          nblocks: partsAmount,
          src: fr.result?.toString() || "",
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
      {data.blocks?.length ? (
        <>
          <Typography variant="h4">Коллекция успешно выпущена.</Typography>
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
            sx={{ my: 2, minWidth: 280 }}
            label="На сколько частей поделить картинку?"
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
          <Box sx={{ maxWidth: 300, width: "100%" }}>
            {uploadedFiles.length ? (
              <Button
                sx={{ width: "100%", mb: 1 }}
                variant="contained"
                color="inherit"
                onClick={(e) => setUploadedFiles([])}
              >
                Загрузить другое изображение
              </Button>
            ) : null}
            {loading ? (
              <Button
                variant="contained"
                color="primary"
                disabled
                sx={{ width: "100%" }}
              >
                Выпустить
                <CircularProgress color="info" size={22} sx={{ ml: 1 }} />
              </Button>
            ) : (
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                color="primary"
                onClick={sendDataClickHandler}
              >
                Выпустить
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
