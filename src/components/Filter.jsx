import React from "react";
import { useState } from "react";
import ZIPS from "../zipCodes.js";
import distance from "@turf/distance";

import {
  Button,
  Form,
  Fieldset,
  Label,
  TextInput,
  FormGroup,
  Dropdown,
  Grid,
} from "@trussworks/react-uswds";

const initialDistance = 25;

const counties = [
  "Atlantic",
  "Bergen",
  "Burlington",
  "Camden",
  "Cape May",
  "Cumberland",
  "Essex",
  "Gloucester",
  "Hudson",
  "Hunterdon",
  "Mercer",
  "Middlesex",
  "Monmouth",
  "Morris",
  "Ocean",
  "Passaic",
  "Salem",
  "Somerset",
  "Sussex",
  "Union",
  "Warren",
];

const Filter = (props) => {
  const [zipCode, setZipCode] = useState("");
  const [county, setCounty] = useState("");
  const [zipDistance, setZipDistance] = useState(initialDistance);

  const filterZIP = () => {
    const centroid = ZIPS[zipCode];
    if (!centroid) return [];
    return props.items
      .map((item) => {
        item._distance =
          centroid && item._centroid && distance(centroid, item._centroid);
        return {
          zip: item._zip,
          distance: item._distance,
        };
      })
      .filter(
        (item) => item.distance !== undefined && item.distance <= zipDistance
      )
      .map((item) => item.zip);
  };

  const clearDistance = () => {
    props.items.forEach((item) => {
      delete item._distance;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!county && !zipCode) return handleClear(event);
    props.setIsLoaded(false);
    if (!zipCode && !county) {
      props.setFilters({});
      clearDistance();
      return false;
    }
    props.setFilters(
      (prevFilters) => ({
        ...prevFilters,
        ZIP: filterZIP(),
        county: county,
      }),
      props.setIsLoaded(true)
    );
  };

  const handleClear = (event) => {
    props.setFilters({});
    setZipCode("");
    setZipDistance(initialDistance);
    setCounty("");
    clearDistance();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="width-full maxw-full margin-bottom-4"
    >
      <Fieldset legend="Filters" legendStyle="srOnly">
        <Grid row gap="md" className="flex-align-end">
          <FormGroup className="tablet:grid-col-2">
            <Label htmlFor="filter-zip">ZIP Code</Label>
            <TextInput
              id="filter-zip"
              name="filter-zip"
              type="text"
              pattern="[\d]{5}"
              title="A ZIP code should be 5 digits long."
              maxLength="5"
              onChange={(event) => setZipCode(event.target.value)}
              value={zipCode}
            />
          </FormGroup>
          <FormGroup className="tablet:grid-col-2">
            <Label htmlFor="filter-zip-distance">Distance</Label>
            <Dropdown
              id="filter-zip-distance"
              name="filter-zip-distance"
              onChange={(event) => setZipDistance(event.target.value)}
              value={zipDistance}
            >
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="25">25 miles</option>
              <option value="50">50 miles</option>
            </Dropdown>
          </FormGroup>
          <FormGroup className="tablet:grid-col-3">
            <Label htmlFor="filter-county">County</Label>
            <Dropdown
              id="filter-county"
              name="filter-county"
              onChange={(event) => setCounty(event.target.value)}
              value={county}
            >
              <option value="">- Select -</option>
              {counties.map((county, index) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </Dropdown>
          </FormGroup>
          <div className="tablet:grid-col-4">
            <ul className="usa-button-group margin-top-2 mobile-lg:margin-top-0 flex-align-center flex-row">
              <li className="usa-button-group__item margin-bottom-0 margin-right-1">
                <Button type="submit">Search</Button>
              </li>
              <li className="usa-button-group__item margin-bottom-0">
                <Button type="button" unstyled onClick={handleClear}>
                  Clear search
                </Button>
              </li>
            </ul>
          </div>
        </Grid>
      </Fieldset>
    </Form>
  );
};
export default Filter;
