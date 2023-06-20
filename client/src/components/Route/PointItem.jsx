import {
  Button,
  Chip,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Card } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const PointItem = ({ point }) => {
  <ListItem>
    <Card>
      <Card.Body>
        <ListItemText
          primary={point.name}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {point.address}
            </Typography>
          }
        />
        <Typography>sdfd</Typography>
      </Card.Body>
    </Card>
  </ListItem>;
};

export default PointItem;
