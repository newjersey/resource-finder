import React from "react";
import { useEffect, useState } from "react";
import Airtable from "airtable";
import ZIPS from "./zipCodes.js";
import "iframe-resizer/js/iframeResizer.contentWindow";

import "@trussworks/react-uswds/lib/index.css";
import "./App.css";
import Filter from "./components/Filter.jsx";
import Item from "./components/Item.jsx";
import { Alert, CardGroup, GridContainer } from "@trussworks/react-uswds";

// Path params
const path = window.location.pathname
  .replace("/app/finder", "")
  .split("/")
  .slice(1);
const baseID = path[0];
const tableID = path[1];
const viewID = path[2];

// Query params
const queryParams = new URLSearchParams(window.location.search);
const locationField = queryParams.get("locationField") || "ZIP";
const nameField = queryParams.get("nameField") || "Name";
const linkField = queryParams.get("linkField") || "Link";
const countyField = queryParams.get("countyField") || "County";

const base = new Airtable({
  apiKey: "unset",
  endpointUrl: "https://innovation.nj.gov/proxy/airtable",
}).base(baseID);

const App = () => {
  // State
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  const displayFields =
    queryParams.get("displayFields") &&
    queryParams
      .get("displayFields")
      .split(",")
      .map((item) => item.trim());
  useEffect(() => {
    base(tableID)
      .select({
        view: viewID,
      })
      .all()
      .then((result) => {
        result = result.map((x) => {
          if (
            x.fields["Name (from County)"] &&
            x.fields["Name (from County)"][0]
          ) {
            x.fields.County = x.fields["Name (from County)"][0];
            delete x.fields["Name (from County)"];
          }
          const zipPattern = /\b(:[A-Z]{2}\s+)?(\d{5})(:-\d{4})?\b/;
          x.fields._zip =
            x.fields[locationField] &&
            x.fields[locationField].match(zipPattern) &&
            x.fields[locationField].match(zipPattern)[0];
          if (x.fields._zip) x.fields._centroid = ZIPS[x.fields._zip];
          x.fields._id = x.id;
          return x.fields;
        });
        setIsLoaded(true);
        setItems(result);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  const filterFunction = (item) => {
    // Remove nameless records
    if (!item[nameField]) {
      return false;
    }
    // Filter ZIPs
    if (
      filters.ZIP &&
      filters.ZIP.length > 0 &&
      (!item._zip || filters.ZIP.indexOf(item._zip) < 0)
    ) {
      return false;
    }
    if (
      filters.county &&
      item[countyField] &&
      item[countyField].toLowerCase() !== filters.county.toLowerCase()
    ) {
      return false;
    }
    return true;
  };

  const sortFunction = (a, b) => {
    if (a._distance >= 0 && b._distance >= 0) {
      return a._distance - b._distance;
    }
  };

  if (error) {
    return <Alert type="error">Error: {error.message}</Alert>;
  } else {
    return (
      <GridContainer className="App padding-05">
        <Filter
          items={items}
          setFilters={setFilters}
          setIsLoaded={setIsLoaded}
        ></Filter>
        {isLoaded ? (
          <CardGroup>
            {items
              .filter(filterFunction)
              .sort(sortFunction)
              .map((item) => (
                <Item
                  key={item._id}
                  item={item}
                  nameField={nameField}
                  linkField={linkField}
                  displayFields={displayFields}
                ></Item>
              ))}
          </CardGroup>
        ) : (
          <div>
            <div className="display-inline-block height-1 width-3 margin-right-1">
              <div className="spinner"></div>
            </div>
            <div className="display-inline-block">Loading items&hellip;</div>
          </div>
        )}

        {isLoaded && !items.filter(filterFunction).length && (
          <Alert type="warning" noIcon>
            No matching items were found. Try changing your search input.
          </Alert>
        )}
      </GridContainer>
    );
  }
};
export default App;
