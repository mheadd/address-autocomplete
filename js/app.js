// URL & query strings for CartoDB API calls.
var url_base = 'https://markh.cartodb.com/api/v2/sql?q=';
var street_name_query = 'SELECT%20DISTINCT(streetname%20%7C%7C%20%27%20%27%20%7C%7C%20posttype)%20AS%20street%20FROM%20addresspoints_onondaga%20WHERE%20streetname%20LIKE%20%27[street-name]%25%27';
var subdivision_name_query = 'SELECT%20citytownna%20FROM%20addresspoints_onondaga_citytown_name%20WHERE%20citytownna%20LIKE%20%27[sub-name]%25%27';

// Autocomplete options for street name.
var street_options = {
  url: function(phrase) { 
      return url_base + street_name_query.replace('[street-name]', phrase);
  },
  ajaxSettings: {
      dataType: "json"
  },
  listLocation: function(data) {
    var choices = [];
    for (var i=0; i<data.rows.length; i++) {
      choices.push({ choice: data.rows[i].street });
    }
    return choices;
  },
  getValue: "choice",
  requestDelay: 200
};

// Autocomplete options for subdivsion name.
var subdivision_options = {
  url: function(phrase) { 
      return url_base + subdivision_name_query.replace('[sub-name]', phrase);
  },
  ajaxSettings: {
      dataType: "json"
  },
  listLocation: function(data) {
    var choices = [];
    for (var i=0; i<data.rows.length; i++) {
      choices.push({ choice: data.rows[i].citytownna });
    }
    return choices;
  },
  getValue: "choice",
  requestDelay: 200
};

// Form validation rules
var form_rules = {
  rules: {
      citizen: {
          required: true
      },
      house: {
          required: true,
          digits: true
      },
      street: {
        required: true
      },
      subdivision: {
        required: true
      },
      state: {
        required: true,
        maxlength: 2
      },
      zip: {
        required: true,
        digits: true,
        maxlength: 5
      }
  },
  submitHandler: function (form) { 
      $("#form-data").append('<p>Valid form data</a>');
      $('#address-form').each(function(){
          this.reset();
      });
      return false; 
  }
};

$(document).ready(function() {

  // Wire up autocomplete to form elements.
  $("#street").easyAutocomplete(street_options);
  $("#subdivision").easyAutocomplete(subdivision_options);

  // Wire up form validastion.
  $("#address-form").validate(form_rules);

});
