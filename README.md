# Address Autocomplete

![Address autocomplete](https://raw.githubusercontent.com/mheadd/address-autocomplete/gh-pages/autocomplete.gif "Address autocomplete")

A simple address autocomplete example meant to help improve address quality on government web form submissions.


## Getting the Data

Data on street names and subdivision names is from the [NYS GIS Clearinghouse](http://gis.ny.gov/gisdata/inventories/details.cfm?DSID=1278). A [different branch](https://github.com/mheadd/address-autocomplete/tree/census) of this project uses data  from the [U.S. Census Bureau](https://www.census.gov/geo/maps-data/data/tiger-line.html). Note - this example uses data for [Onondaga County, NY](https://en.wikipedia.org/wiki/Onondaga_County,_New_York).

Downloaded shapefiles from the NYS GIS Clearinghouse can be loaded into CartoDB. Then [CartoDB's SQL API](https://docs.cartodb.com/cartodb-platform/sql-api/) powers the autocomplete in street name and city / town name fields.

## Staging address data in CartoDB

* [Download the shapefile](http://gis.ny.gov/gisdata/inventories/details.cfm?DSID=921) for the county where your city or town is located.
* Using your CartoDB account credentials, [log in](https://cartodb.com/login) to the CartoDB site.
* Navigate to the Datasets view and click on New Dataset.
* Upload your shapefile and click on Select Dataset. 

When your new dataset is created you will see a table view of records. For the purposes of address completion, we are interested in three fields - ```streetname``` + ```posttype``` will give us unique street names to assist in completing the **Street Name** field, and ```citytownna``` which will give us the unique name of cities and towns for completing the **City / Town** field.

For example, to look up a list of unqiue street names for streets beginning with 'Green', we would use:

```sql
SELECT DISTINCT(streetname || ' ' || posttype) AS street FROM addresspoints_onondaga WHERE streetname LIKE 'Green%'
```

To look up the unique names for all cities and towns we would use:

```sql
SELECT DISTINCT(citytownna) FROM addresspoints_onondaga
```

## Using the CartoDB API

Here is an example API call for street names beginning with ```Green```. We append our SQL query from above to the end of the URL for the CartoDB SQL API (which includes your CartoDB username - see below). Note, the SQL query must be [URL encoded](https://en.wikipedia.org/wiki/Percent-encoding) in order to work properly. Your browser will typically do this automatically, but other tools and frameworks may not unless you explicitly do this:

```bash
https://{username}.cartodb.com/api/v2/sql?q=SELECT%20DISTINCT(streetname%20%7C%7C%20%27%20%27%20%7C%7C%20posttype)%20AS%20street%20FROM%20addresspoints_onondaga%20WHERE%20streetname%20LIKE%20%27Green%20%25%27
```

The response we get back looks like this:

```json
{
  "total_rows": 16,
  "fields": {
    "fullname": {
      "type": "string"
    }
  },
  "time": 0.004,
  "rows": [
    {
      "fullname": "Green Street Pl"
    },
    {
      "fullname": "Green Fir Cir"
    },
    {
      "fullname": "Green Meadow"
    },
    {
      "fullname": "Green River Way"
    },
    {
      "fullname": "Green St"
    },
    {
      "fullname": "Green Lakes Rd"
    },
    {
      "fullname": "Green St Annex"
    },
    {
      "fullname": "Green Lake Rd"
    },
    {
      "fullname": "Green Lakes Park Dr"
    },
    {
      "fullname": "Green St"
    },
    {
      "fullname": "Green Lakes Park Ter"
    },
    {
      "fullname": "Green Meadow"
    },
    {
      "fullname": "Green Acres Dr"
    },
    {
      "fullname": "Green St"
    },
    {
      "fullname": "Green Street Ct"
    },
    {
      "fullname": "Green Street Aly"
    }
  ]
}
```

## Made with

* [Bootstrap](http://getbootstrap.com/) / [Bootswatch](https://bootswatch.com/)
* [jQuery](https://jquery.com/)
* jQuery [EasyAutocomplete](http://easyautocomplete.com/)
* jQuery [Validate](https://jqueryvalidation.org/)
* [CartoDB](https://cartodb.com/)