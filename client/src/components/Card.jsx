import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, IconButton, CardMedia } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";

const CustomCard = (props) => {
  const { avatarUrl, title, price, description, imageUrl } = props;
  let type = true;

  return (
    <Card>
      <CardHeader
        // avatar={<Avatar src={avatarUrl} />}
        action={
          <IconButton aria-label="settings">
            <MoreIcon />
          </IconButton>
        }
        title={title}
        subheader={price}
      />
      {/* <CardMedia style={{ height: "150px" }} image={imageUrl} /> */}
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy now</Button>
        <Button size="small">Offer</Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
