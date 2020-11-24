"use strict";
import axios from 'axios';
var createTableForm = document.getElementById("createTableForm");
import Swal from 'sweetalert2'

$(document).ready(function () {
  var placeTables = $('#placeTables');
  var placeWorkersTable = $('#placeWorkersTable');

  if (placeTables) {
    var placeDataTable = placeTables.DataTable({searching: false, info: false});
  }

  if (placeWorkersTable) {
    var placeWorkersDataTable = placeWorkersTable.DataTable({searching: false, info: false});
  }

  createTableForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(createTableForm);
    formData.append('active', ($("#isActive").prop('checked') ? 1 : 0))

    axios.post('/admin/table', formData)
      .then(response => {
        toastr.success(response.data.message);
        var data = response.data.table
        $("[data-dismiss=modal]").trigger({ type: "click" });

        placeDataTable.row.add([
          data.id,
          data.name,
          '<p>'+(data.workers.map(item =>'<p class="m-0">'+item.name_full+'</p>'))+'</p>',
          data.updated_at,
          0,
          template('placeTablesTableButtons', {id: data.id}),
        ]).draw(false).node();
      }).catch((error) => {
      let errors = error.response.data;
        if(typeof errors === 'object' && errors !== null) {
          let firstErrorKey = Object.keys(errors)[0];
          toastr.error(errors[firstErrorKey])
          return false;
        }
        toastr.error(error.response.data)
    });
  });
  $(document).on('click', '.place-tables-delete', function(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Вы уверены?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'да',
      cancelButtonText: 'Отмена',
    }).then((result) => {
      if (result.isConfirmed) {
        var table_id = $(this).data('id');
        axios.delete('/admin/table/' + table_id,)
          .then(response => {
            toastr.success(response.data.message);
            placeDataTable.row($(this).parents('tr') )
              .remove()
              .draw()
          }).catch((error) => {
          let errors = error.response.data;
          if(typeof errors === 'object' && errors !== null) {
            let firstErrorKey = Object.keys(errors)[0];
            toastr.error(errors[firstErrorKey])
            return false;
          }
          toastr.error(error.response.data)
        });
      }
    })

  })

  function template(templateId, data ){
    return document.getElementById(templateId).innerHTML
      .replace(
        /%(\w*)%/g, // or /{(\w*)}/g for "{this} instead of %this%"
        function( m, key ){
          return data.hasOwnProperty( key ) ? data[ key ] : "";
        }
      );
  }
});
