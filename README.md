# Finder

A front-end ZIP code-based search tool for resources stored in Airtable, e.g. food pantries, vaccination clinics, etc.

## Usage

Configure this application by building a URL to use in an `iframe` embed. The URL `path` (the subdirectories) specific the Airtable base, table, and view. The URL `parameters` customize the functionality of the search interface.

### Initial set up

- Set up table and view in Airtable. The view may be filtered to the records you want to share publicly. For now, keep views < 500 records for sake of performance.
  - Note: while you can hide fields in Airtable, all fields are sent to a user's browser, so don't put anything sensitive in any field on a table that will be shared publicly. There's a parameter for choosing which fields are displayed publicly, but even fields not displayed are discoverable in the API response
- The table should have at least the following fields
  - `locationField` a field containing a ZIP code or a full address with a ZIP at the end of it. By default, the application will look for a field named `ZIP` for this, but you may specify any other field name by setting the `locationField` URL parameter
  - `nameField` a field containing the resource's name, to be shown as a header on the resource's card. Defaults to field `Name`, may be specified through the `nameField` param
  - `countyField` a field containing a county name, which is used to enable the County filter. For now, this is required, and values should be one of the NJ county names (e.g. "Cape May", not "Cape May County"). Defaults to `County`, may be specified
  - `linkField` (optional) a fully qualified URL (e.g. https://example.com/path). If present, this will show up as a button that says "Visit site" on the resource card. Defaults to `Link` field; specify through param
- Share the table / view with "read only access" with the user "dave.cole@oit.nj.gov (READ ONLY API)", to allow for public access to the view
- Build an embed URL starting with the URL base `https://innovation.nj.gov/app/finder/`, followed by the Airtable path (copied from the path of the URL when you're looking at the view you want to share in Airtable), e.g. `appzXNd4ovBNZ0ZJb/tblsy2WZggzW1rwD8/viw9MPuhzMteXxi3U`, followed optionally by a `?` and any parameters you want to specify (params should be in the format of `?key=value&key2=value2&key3=value3`), e.g. `?locationField=Address&linkField=Link`
- Use this URL as the `src` of an `iframe` tag to embed it on a webpage

### Sample embed code

```html
<script src="https://beta.nj.gov/global-signup/form/vendor/iframeResizer.min.js"></script>
<iframe
  onload="iFrameResize({}, this);"
  style="width: 1px; min-width: 100%; border: 0"
  src="{finder URL}"
></iframe>
```

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
