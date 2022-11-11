const core = require("@actions/core");
const { Client } = require("@notionhq/client");

async function run() {
  try {
    const secretToken = core.getInput("notion_secret", { required: true });

    const notion = new Client({
      auth: secretToken,
    });

    const pageUpdateProperties = core.getInput("notion_page_update_properties", { required: true });

    let pageId = core.getInput("notion_page_id", { required: false });
    const databaseId = core.getInput("notion_database_id", { required: false });
    const databaseQueryFilter = core.getInput("notion_database_query_filter", { required: false });

    if (pageId === "") {
      if (databaseId === "" || databaseQueryFilter === "") {
        throw new Error("Either a page ID or a database ID and query filter must be provided");
      }

      const databaseQueryResults = (
        await await notion.databases.query({
          database_id: databaseId,
          filter: JSON.parse(databaseQueryFilter),
        })
      ).results;

      if (databaseQueryResults.length === 0) {
        throw new Error("Could not find pages with filter: " + databaseQueryFilter);
      } 

      pageId = databaseQueryResults[0].id;
    }

    await notion.pages.update({
      page_id: pageId,
      properties: JSON.parse(pageUpdateProperties),
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
