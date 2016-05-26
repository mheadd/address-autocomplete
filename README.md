# Address Autocomplete

![Address aotocomplete](https://raw.githubusercontent.com/mheadd/address-autocomplete/gh-pages/autocomplete.gif "Address aotocomplete")

A simple autocomplete example to help improve address quality on government web form submissions.

Made with:

* [Bootstrap](http://getbootstrap.com/) / [Bootswatch](https://bootswatch.com/)
* [jQuery](https://jquery.com/)
* jQuery [EasyAutocomplete](http://easyautocomplete.com/)
* jQuery [Validate](https://jqueryvalidation.org/)
* [CartoDB](https://cartodb.com/)

Data on street names and subdivision names is from the [U.S. Census Bureau](https://www.census.gov/geo/maps-data/data/tiger-line.html). Note - this example uses data for [Onondaga County, NY](https://en.wikipedia.org/wiki/Onondaga_County,_New_York).

Downloaded TIGER/Line Shapefiles from the Census Bureau can be uploaded to CartoDB. Then [CartoDB's SQL API](https://docs.cartodb.com/cartodb-platform/sql-api/) powers the autocomplete in street name and subdivison name fields.

Example API call for street names beginning with ```Green```:

```bash
https://{username}.cartodb.com/api/v2/sql?q=SELECT%20fullname%20FROM%20onondaga_county_roads%20WHERE%20fullname%20LIKE%20%27Green%20%25%27
```

Response:

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
