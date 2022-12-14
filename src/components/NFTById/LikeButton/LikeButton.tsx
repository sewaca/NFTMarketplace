import { IconButton, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import API from "../../../API/API";
import { LoginContext } from "../../../contexts/LoginContext";
import useApiMutation from "../../../hooks/useApiMutation";

interface LikeButtonProps {
  liked: boolean;
  id: number;
}

export default function LikeButton({ liked, id }: LikeButtonProps) {
  const [login] = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isLiked, setIsLiked] = useState(false);
  const { send } = useApiMutation();
  // When prop liked changes - change state
  useEffect(() => {
    if (liked !== isLiked) setIsLiked(liked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked]);

  const handleClick = () => {
    if (!login)
      return enqueueSnackbar(
        <Typography variant="body1" sx={{ lineHeight: 1 }}>
          Это действие доступно только зарегистрированным пользователям
        </Typography>,
        { variant: "error" }
      );
    // HANDLE LIKE
    send(() =>
      API.likeNFT({ login, nftId: id, liked: !isLiked })
        .then((res) => res.json())
        .then((ans) => {
          if (ans.status !== "ok")
            enqueueSnackbar(
              <Typography>Произошла ошибка. Попробуйте позже</Typography>,
              { variant: "error" }
            );
          setIsLiked((value) => (ans.status === "ok" ? value : !value));
        })
    );
    setIsLiked(!isLiked);
  };

  return (
    <Tooltip title="В избранное" placement="top">
      <IconButton sx={{ zIndex: 5 }} onClick={() => handleClick()}>
        {/* <FavoriteIcon htmlColor={isLiked ? theme.palette.secondary.main : "#bfbfbf"}/> */}
        <svg width={24} height={24}>
          <defs>
            <linearGradient id="grad1" gradientTransform="rotate(35)">
              <stop offset="13%" stopColor="var(--secondary-main)" />
              <stop offset="100%" stopColor="var(--primary-main)" />
            </linearGradient>
          </defs>
          <path
            fill={isLiked ? "url(#grad1)" : "#bfbfbf"}
            // fill={isLiked ? "var(--secondary-main)" : "#bfbfbf"}
            d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          ></path>
        </svg>
      </IconButton>
    </Tooltip>
  );
}
