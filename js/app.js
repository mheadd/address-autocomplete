// URL & query strings for CartoDB API calls.
var url_base = 'https://markh.cartodb.com/api/v2/sql?q=';
var street_name_query = 'SELECT%20DISTINCT(fullname)%20FROM%20onondaga_county_roads%20WHERE%20fullname%20LIKE%20%27[street-name]%25%27';
var subdivision_name_query = 'SELECT%20name%20FROM%20onondaga_county_subdivisdions%20WHERE%20name%20LIKE%20%27[sub-name]%25%27';

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
      choices.push({ choice: data.rows[i].fullname });
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
      choices.push({ choice: data.rows[i].name });
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
