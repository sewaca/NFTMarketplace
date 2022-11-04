import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import styles from "./drag-n-drop-uploader.module.css";

interface DragNDropUploaderProps {
  uploadedFiles: Array<File>;
  setUploadedFiles: Function;
  setMaxPartsAmount: Function;
  setUploadedPreview: Function;
}

export default function DragNDropUploader({
  uploadedFiles,
  setUploadedFiles,
  setMaxPartsAmount,
  setUploadedPreview,
}: DragNDropUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  // Параметры загружамых файлов
  const fileTypes = ["image/png", "image/jpg", "image/jpeg"];
  const maxFileSize = 20 * 1024 * 1024; // in B
  const maxFilesAmount = 1;

  const addUploadedFiles = (files: Array<File>) => {
    // Оставляем только файлы удовлетворяющие условиям
    files = files.filter((file) => {
      // Сделаем прямо в filter вывод ошибок пользователю.
      if (!fileTypes.includes(file.type))
        enqueueSnackbar(
          "Один или несколько файлов не были загружены, т.к. имели неверный формат",
          { variant: "error" }
        );
      else if (file.size > maxFileSize)
        enqueueSnackbar(
          "Один или несколько файлов не были загружены, т.к. имели слишком большой размер",
          { variant: "error" }
        );
      return fileTypes.includes(file.type) && file.size <= maxFileSize;
    });
    // Если удовлетворяющих условиям файлов нет, мы не будем исполнять код дальше
    if (!files) return;
    // Добавляем удовлетворяющие условиям файлы. Если таких нет
    let newUploadedFiles = [...uploadedFiles, ...files].slice(
      -1 * maxFilesAmount
    );
    setUploadedFiles(newUploadedFiles);
    // Получаем Preview загруженной картинки:
    let fr = new FileReader();
    fr.readAsDataURL(newUploadedFiles[0]);
    fr.onloadend = () => {
      setUploadedPreview(fr.result);
      let img = new Image();
      img.src = "" + fr.result;
      img.onload = () => {
        setMaxPartsAmount(img.width * img.height);
      };
    };
  };

  const dragStartHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    let files: Array<File> = Array.from(e.dataTransfer?.files || []);
    addUploadedFiles(files);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = Array.from(e.target.files || []);
    addUploadedFiles(files);
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (inputRef.current) inputRef.current.click();
  };

  const handlers = {
    onDragEnter: dragStartHandle,
    onDragLeave: dragLeaveHandler,
    onDragOver: dragOverHandler,
    onDrop: dropHandler,
    onClick: clickHandler,
  };

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        accept={fileTypes.join(",")}
        onChange={fileInputChangeHandler}
        ref={inputRef}
      />
      <div className={styles.Area} {...handlers}>
        {isDragging ? (
          <span style={{ pointerEvents: "none" }}>
            Отпустите файлы, чтобы загрузить их
          </span>
        ) : (
          <>
            <Typography sx={{ mb: "10px" }}>
              Перетащите картинку, или&nbsp;
              <Typography
                component="span"
                color="primary"
                sx={{ fontWeight: 500, textDecoration: "underline" }}
              >
                загрузите напрямую
              </Typography>
            </Typography>
            <Typography sx={{ color: "gray" }}>
              Доступные форматы: jpg, jpeg, png
            </Typography>
            <Typography sx={{ color: "gray" }}>
              Максимальный размер: 1 Мб
            </Typography>
          </>
        )}
      </div>
    </>
  );
}
