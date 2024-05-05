function fetchData (d) {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify(d),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('section.places').empty();
      data.forEach((p) => {
        const article = $('<article></article>');
        const div = $('<div></div>').addClass('title_box');
        div.append($('<h2></h2>').text(p.name));
        div.append($('<div></div>').addClass('price_by_night').text('$' + p.price_by_night));
        article.append(div);
        const div2 = $('<div></div>').addClass('information');
        div2.append($('<div></div>').addClass('max_guest').text(p.max_guest + (p.max_guest > 1 ? ' Guests' : ' Guest')));
        div2.append($('<div></div>').addClass('number_rooms').text(p.number_rooms + (p.number_rooms > 1 ? ' Bedrooms' : ' Bedroom')));
        div2.append($('<div></div>').addClass('number_bathrooms').text(p.number_bathrooms + (p.number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom')));
        article.append(div2);
        const div3 = $('<div></div>').addClass('description').text(p.description);
        article.append(div3);
        $('section.places').append(article);
      });
    }
  });
}

$(document).ready(function () {
  let amenityIds = [];
  $('.amenities input:checkbox').change(function () {
    const DataId = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      amenityIds.push(DataId);
    } else {
      amenityIds = amenityIds.filter(function (el) {
        return el !== DataId;
      });
    }
    let str = '';
    amenityIds.forEach((id, i) => {
      str += $(`.amenities input[type="checkbox"][data-id="${id}"]`).attr('data-name');
      if (i + 1 < amenityIds.length) {
        str += ', ';
      }
    });
    $('div.amenities h4').text(str);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  fetchData({});
  const locations = {};
  locations.states = [];
  locations.cities = [];
  $('.locations .states').change(function () {
    const DataId = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      locations.states.push(DataId);
    } else {
      locations.states = locations.states.filter(function (el) {
        return el !== DataId;
      });
    }
    let str = '';
    locations.states.forEach((id, i) => {
      str += $(`.locations .states[data-id="${id}"]`).attr('data-name');
      if (i + 1 < locations.states.length) {
        str += ', ';
      }
    });
    $('div.locations h4').text(str);
  });
  $('.locations .cities').change(function () {
    const DataId = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      locations.cities.push(DataId);
    } else {
      locations.cities = locations.cities.filter(function (el) {
        return el !== DataId;
      });
    }
    let str = '';
    locations.cities.forEach((id, i) => {
      str += $(`.locations .cities[data-id="${id}"]`).attr('data-name');
      if (i + 1 < locations.cities.length) {
        str += ', ';
      }
    });
    $('div.locations h4').text(str);
  });
  $('button').click(function () {
    fetchData({ states: locations.states, cities: locations.cities, amenities: amenityIds });
  });
});
