import {
  Card,
  CardMedia,
  Skeleton,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { INFT } from "../../../../types";
import styles from "./nftInfo.module.css";

interface NftInfoProps {
  nft: INFT;
}

export default function NftInfo({ nft }: NftInfoProps) {
  return (
    <div style={{ padding: "0 6px", height: "100%" }}>
      <Card className={styles.NFTInfoCard}>
        <Link
          to={"/nft/" + nft.id}
          className={styles.NFTInfoCard__Link}
        />
        <CardMedia>
          {nft.img ? (
            <div
              style={{
                width: 230,
                height: 230,
                margin: "0 auto",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={nft.img}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  margin: "auto",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                alt="2"
              />
            </div>
          ) : (
            <Skeleton width={"100%"} height={240} />
          )}
        </CardMedia>
        <CardContent sx={{ textAlign: "center", p: 0, pt: 2 }}>
          <Typography variant="h6">{nft.title}</Typography>
          <Typography variant="h6" className={styles.NFTInfoCard__Price}>
            {nft.price.toString().replace(".", ",")} ETH
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            className={styles.NFTInfoCard__Button}
          >
            <Typography variant="body1">ПОДРОБНЕЕ</Typography>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
