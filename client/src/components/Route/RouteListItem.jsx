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
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RouteListItem = ({
  name,
  short_description,
  points,
  handler,
  categories,
  id,
}) => {
  const { t } = useTranslation();

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
          <Stack direction="row" spacing={2}>
            {categories.map((category, i) => (
              <Chip
                label={category.categoryName}
                key={i}
                sx={{ width: "fit-content" }}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button color="secondary" onClick={(e) => handler(points)}>
              {t("Show on map")}
            </Button>
            <Link to={`/route/${id}`}>
              <Button color="secondary">{t("More")}</Button>
            </Link>
          </Stack>
        </Card.Body>
      </Card>
    </ListItem>
  );
};

export default RouteListItem;
