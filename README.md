# Next.js + Tailwind CSS + Firebase + Elasticsearch

## Step by step

1. Clone the repo
2. Run yarn install
3. Navigate to firebase.js
4. Replace firebaseConfig with your newly created firebaseConfig from firebase.
5. Create .env.local file and insert
   GOOGLE_CLIENT_ID= <Your client id from google Auth>
   GOOGLE_CLIENT_SECRET=<Your client secret from google Auth>
   NEXTAUTH_URL=http://localhost:3000

## TODO

1. Create Elastic account at elastic.io
2. Connect your firebase database with your elastic account.
3. Index your data as shown in the Coaching call
4. Display Indexed data to your React Application

# About Search UI

## Getting started

Install React Search UI and the App Search connector.

```bash
# Install React Search UI and a Connector, like the Elastic App Search Connector
npm install --save @elastic/react-search-ui @elastic/search-ui-app-search-connector
```

## Creating a search experience

Use out of the box components, styles, and layouts to build a search experience in a matter of minutes.

```bash
import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "search-371auk61r2bwqtdzocdgutmg",
  engineName: "search-ui-examples",
  endpointBase: "http://127.0.0.1:3002",
  cacheResponses: false
});

export default function App() {
  return (
    <SearchProvider
      config={{
        apiConnector: connector
      }}
    >
      <div className="App">
        <Layout
          header={<SearchBox />}
          bodyContent={<Results titleField="title" urlField="nps_link" />}
        />
      </div>
    </SearchProvider>
  );
}
```

Or go "headless", and take complete control over the look and feel of your search experience.

```bash
<SearchProvider config={config}>
  <WithSearch
    mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({
      searchTerm,
      setSearchTerm,
      results
    })}
  >
    {({ searchTerm, setSearchTerm, results }) => {
      return (
        <div>
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {results.map(r => (
            <div key={r.id.raw}>{r.title.raw}</div>
          ))}
        </div>
      );
    }}
  </WithSearch>
</SearchProvider>
```

### For more Info.

[Read Me](https://github.com/elastic/search-ui#readme)
