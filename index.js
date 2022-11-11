const core = require("@actions/core");
const { Client } = require("@notionhq/client");

async function run() {
  try {
    const secretToken = core.getInput("notion_secret");

    const notion = new Client({
      auth: secretToken,
    });

    const pageUpdateProperties = core.getInput("notion_page_update_body");
    console.log(pageUpdateProperties);

    let pageId = core.getInput("notion_page_id");
    const databaseId = core.getInput("notion_database_id");
    const databaseQueryFilter = core.getInput("notion_database_query_filter");

    if (pageId === "") {
      if (databaseId === "" || databaseQueryFilter === "") {
        core.setFailed("either pageId or (databaseId and databaseQueryFilter) must be provided");
      }

      const databaseQueryResults = (
        await await notion.databases.query({
          database_id: databaseId,
          filter: databaseQueryFilter,
        })
      ).results;

      if (databaseQueryResults.length === 0) {
        core.setFailed("page doesn't exist");
      }

      pageId = databaseQueryResults[0].id;
    }

    await notion.pages.update({
      page_id: pageId,
      properties: pageUpdateProperties,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
