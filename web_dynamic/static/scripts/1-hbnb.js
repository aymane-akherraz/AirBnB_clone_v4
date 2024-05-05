$(document).ready(function () {
  let amenityIds = [];
  $('input:checkbox').change(function () {
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
      str += $(`input[type="checkbox"][data-id="${id}"]`).attr('data-name');
      if (i + 1 < amenityIds.length) {
        str += ', ';
      }
    });
    $('div.amenities h4').text(str);
  });
});
