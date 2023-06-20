import { Button, ListItem, ListItemText, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Card } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const PrivProfRouteItem = ({ name, short_description, id, deleteRoute }) => {
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
          <Stack direction="row">
            <Link to={`/route/${id}`}>
              <Button color="secondary">Подробнее</Button>
            </Link>
            <Button color="error" onClick={(e) => deleteRoute(id)}>
              Удалить
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </ListItem>
  );
};

export default PrivProfRouteItem;
