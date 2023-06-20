import {
  Button,
  Chip,
  ListItem,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";
import { Card } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const PointListItem = ({ point, index }) => {
  return (
    <ListItem>
      <Card>
        <Card.Body>
          <ListItemText
            primary={`${index}. ${point.name}`}
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
        </Card.Body>
      </Card>
    </ListItem>
  );
};

export default PointListItem;
