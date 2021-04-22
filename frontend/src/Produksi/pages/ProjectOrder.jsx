import React, { useState } from "react";
import ProjectOrderTabel from "../components/projectOrderTabel";
import Card from "../../shared/UIElements/Card";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";

const ProjectOrder = () => {
  const [filter, setFilter] = useState("semua");

  const filterSemuaHandler = () => {
    setFilter("semua");
  };

  const filterSelesaiHandler = () => {
    setFilter("selesai");
  };

  const filterBerjalanHandler = () => {
    setFilter("berjalan");
  };

  const useStyles = makeStyles(() => ({
    btnPoAktif: {
      backgroundColor: "#0130a4",
      color: "white",
    },
  }));

  const classes = useStyles();

  return (
    <Card
      header="Project Order"
      headerFlex={
        <ButtonGroup>
          <Button
            onClick={filterSemuaHandler}
            className={filter === "semua" ? classes.btnPoAktif : null}
          >
            SEMUA
          </Button>
          <Button
            onClick={filterSelesaiHandler}
            className={filter === "selesai" ? classes.btnPoAktif : null}
          >
            SELESAI
          </Button>
          <Button
            onClick={filterBerjalanHandler}
            className={filter === "berjalan" ? classes.btnPoAktif : null}
          >
            BERJALAN
          </Button>
        </ButtonGroup>
      }
    >
      <ProjectOrderTabel filter={filter} />
    </Card>
  );
};

export default ProjectOrder;
