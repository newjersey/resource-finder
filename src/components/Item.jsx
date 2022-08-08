import React from "react";
import {
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  GridContainer,
  Icon,
  Tag,
} from "@trussworks/react-uswds";

const Item = (props) => {
  const item = props.item;
  const nameField = props.nameField;
  const linkField = props.linkField;
  const displayFields = props.displayFields;

  return (
    <Card gridLayout={{ tablet: { col: 12 } }}>
      <CardHeader>
        <h2 className="usa-card__heading">{item[nameField]}</h2>
        {Math.floor(item._distance) === 1 ? (
          <small>{Math.floor(item._distance)} mile away</small>
        ) : item._distance >= 0 ? (
          <small>{Math.floor(item._distance)} miles away</small>
        ) : (
          ""
        )}
      </CardHeader>
      <CardBody>
        <GridContainer className="padding-x-0">
          <Grid row gap="md">
            {Object.entries(item).map(
              (field) =>
                (!displayFields || displayFields.indexOf(field[0]) >= 0) &&
                field[0] !== nameField &&
                field[0] !== linkField &&
                field[0].charAt(0) !== "_" && (
                  <Grid key={field[0]} tablet={{ col: true }}>
                    <strong>{field[0]}</strong>
                    <br />
                    <span style={{ wordWrap: "break-word" }}>
                      {field[1] === true ? (
                        <Icon.Check></Icon.Check>
                      ) : Array.isArray(field[1]) ? (
                        field[1].map((tag, index) => (
                          <Tag
                            className="bg-info-lighter text-no-uppercase text-ink display-inline-block margin-bottom-1"
                            key={"tag-" + index}
                          >
                            {tag}
                          </Tag>
                        ))
                      ) : field[1] &&
                        field[1].length === 10 &&
                        field[1].match(
                          /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/
                        ) ? (
                        new Date(field[1].split("-")).toLocaleDateString(
                          "en-US"
                        )
                      ) : field[1] &&
                        field[1].length !== 5 &&
                        field[1].match(
                          /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$/
                        ) ? (
                        new Date(field[1]).toLocaleDateString("en-US") +
                        " " +
                        new Date(field[1]).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      ) : (
                        field[1] + ""
                      )}
                    </span>
                  </Grid>
                )
            )}
          </Grid>
        </GridContainer>
      </CardBody>
      <CardFooter>
        {linkField && item[linkField] && (
          <Link
            className="usa-button"
            variant="unstyled"
            href={item[linkField]}
            target="_blank"
          >
            Visit site
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default Item;
