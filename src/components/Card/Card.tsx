import React from "react";
import { Typography, CardActions, Button, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface ICard {
  title: string;
  desc: string;
}

const CardBox: React.FC<ICard> = ({ title, desc }) => {
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {title}
        </Typography>

        <Typography variant="body2">{desc}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">link</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <div>
      <Card sx={{ maxWidth: 275 }} variant="outlined">
        {card}
      </Card>
    </div>
  );
};

export default CardBox;
