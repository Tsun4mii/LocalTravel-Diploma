import { Button, ListItem, ListItemText, Typography } from "@mui/material";
import { Card } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const ProfRouteItem = ({ name, short_description, id }) => {
  return (
    <ListItem>
      <Card>
        <Card.Body>
          <ListItemText
            primary={name}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {short_description}
              </Typography>
            }
          />
          <Link to={`/route/${id}`}>
            <Button color="secondary">Подробнее</Button>
          </Link>
        </Card.Body>
      </Card>
    </ListItem>
  );
};

export default ProfRouteItem;
