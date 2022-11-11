# "Update Notion Page" Action for GitHub Actions

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [License Summary](#license-summary)

<!-- tocstop -->

## Usage

Add the following step to your workflow:

```yaml
- name: Update Notion Page
  uses: ydataai/update-notion-page@v1
  with:
    notion_secret: "<NOTION_SECRET_TOKEN>"
    notion_page_id: "<NOTION_PAGE_ID>"
    notion_page_update_properties: '{  "In stock": { "checkbox": false }  }'
```

Or fi you want to use a page of a database without the direct `page_id`:

```yaml
- name: Update Notion Page
  uses: ydataai/update-notion-page@v1
  with:
    notion_secret: "<NOTION_SECRET_TOKEN>"
    notion_database_id: "<NOTION_DATABASE_ID>"
    notion_database_query_filter: '{  "property": "In stock",  "checkbox": { "equals": true }  }'
    notion_page_update_properties: '{  "In stock": { "checkbox": false }  }'
```

See [action.yml](action.yml) for the full documentation for this action's inputs and outputs.

## License

The scripts and documentation in this project are released under the MIT License
