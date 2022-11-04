import { IconButton, Tooltip } from "@mui/material";
import React from "react";

interface LikeButtonProps {
  isLiked: boolean;
  setIsLiked: Function;
}

export default function LikeButton({ isLiked, setIsLiked }: LikeButtonProps) {
  return (
    <Tooltip title="В избранное" placement="top">
      <IconButton onClick={() => setIsLiked(!isLiked)}>
        <svg width={24} height={24}>
          <defs>
            <linearGradient id="grad1" gradientTransform="rotate(35)">
              <stop offset="13%" stop-color="#8809bb" />
              <stop offset="100%" stop-color="#ED720A" />
            </linearGradient>
          </defs>
          <path
            fill={isLiked ? "url(#grad1)" : "#bfbfbf"}
            d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          ></path>
        </svg>
      </IconButton>
    </Tooltip>
  );
}
