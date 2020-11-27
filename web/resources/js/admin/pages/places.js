"use strict";
import axios from 'axios';
import Swal from 'sweetalert2'
import moment from 'moment'


$(document).ready(function () {
  // place tables
  var placeTables = $('#placeTables');
  var editedIndex = 0;
  if (placeTables) {
    var placeDataTable = placeTables.DataTable({
      searching: true,
      info: false,
      language: {
        paginate: {
          first: "Первый",
          last: "Прошлой",
          next: "Вперёд",
          previous: "Назад"
        }
      }
    });
  }

  $('#placeTablesSearchInput').on('keyup', function () {
    placeDataTable.search(this.value).draw();
  });

  $('#openAddEditTableModal').on('click', function () {
    var createTableForm = $("#createTableForm");
    createTableForm.find("[name='table_id']").val(0);
    createTableForm.find("[name='marker_code']").val("");
    createTableForm.find("[name='name']").val("");
  });

  var createTableForm = document.getElementById("createTableForm");
  createTableForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(createTableForm);
    formData.append('active', ($("#isActive").prop('checked') ? 1 : 0))
    axios.post('/admin/table', formData)
      .then(response => {
        toastr.success(response.data.message);
        var data = response.data.table
        $("[data-dismiss=modal]").trigger({type: "click"});

        var workers = '';
        data.workers.map(item => {
          workers += '<p class="m-0">' + item.name_full + '</p>';
        })

        let responseData = [
          data.id,
          data.name,
          workers,
          moment(data.updated_at).format('MM-D-yyyy'),
          0,
          template('placeTableButtons', {id: data.id}),
        ];
        var tableForm = $("#createTableForm");

        if (tableForm.find("[name='table_id']").value == '0') {
          placeDataTable.row.add(responseData).draw(false).node();
        } else {
          placeDataTable.row(editedIndex).data(responseData).draw(false).node();
        }
        createTableForm.reset()
      }).catch((error) => {
      console.log(error);
      let errors = error.response.data;
      if (typeof errors === 'object' && errors !== null) {
        let firstErrorKey = Object.keys(errors)[0];
        toastr.error(errors[firstErrorKey])
        return false;
      }
      toastr.error(error.response.data)
    });
  });

  $(document).on('click', '.place-tables-delete', function (e) {
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
            let data = response.data.table;


            if (data) {
              var workers = '';
              data.workers.map(item => {
                workers += '<p class="m-0">' + item.name_full + '</p>';
              })
              let responseData = [
                data.id,
                data.name,
                workers,
                moment(data.updated_at).format('MM-D-yyyy'),
                0,
                template('placeTableResetButtons', {id: data.id}),
              ];

              placeDataTable.row($(this).parents('tr')).data(responseData).draw(false).node();
            } else {
              placeDataTable.row($(this).parents('tr'))
                .remove()
                .draw()
            }
          }).catch((error) => {
          let errors = error.response.data;
          if (typeof errors === 'object' && errors !== null) {
            let firstErrorKey = Object.keys(errors)[0];
            toastr.error(errors[firstErrorKey])
            return false;
          }
          toastr.error(error.response.data)
        });
      }
    })
  })

  $(document).on('click', '.restore-place-table', function (e) {
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
        axios.get('/admin/table/' + table_id + '/restore',)
          .then(response => {
            toastr.success(response.data.message);
            var data = response.data.table;
            var workers = '';
            console.log(data);
            data.workers.map(item => {
              workers += '<p class="m-0">' + item.name_full + '</p>';
            })
            let responseData = [
              data.id,
              data.name,
              workers,
              moment(data.updated_at).format('MM-D-yyyy'),
              0,
              template('placeTableButtons', {id: data.id}),
            ];
            placeDataTable.row($(this).parents('tr').data('index')).data(responseData).draw(false).node();

          }).catch((error) => {
          console.log(error);
          let errors = error.response.data;
          if (typeof errors === 'object' && errors !== null) {
            let firstErrorKey = Object.keys(errors)[0];
            toastr.error(errors[firstErrorKey])
            return false;
          }
          toastr.error(error.response.data)
        });
      }
    })
  })

  $(document).on('click', '.edit-place-table', function (e) {
    e.preventDefault();
    var table_id = $(this).data('id');
    editedIndex = $(this).parents('tr').data('index');

    axios.get('/admin/table/' + table_id,).then(response => {
      let data = response.data.table;
      console.log(data);
      var createTableForm = $("#createTableForm");
      createTableForm.find("[name='table_id']").val(data.id);
      createTableForm.find("[name='marker_code']").val(data.marker_code);
      createTableForm.find("[name='name']").val(data.name);
      let workers = [];

      data.workers.map(item => {
        workers.push(item.id)
      });

      $('.selectpicker').selectpicker('val', workers);
    }).catch((error) => {
      console.log(error);
      let errors = error.response.data;
      if (typeof errors === 'object' && errors !== null) {
        let firstErrorKey = Object.keys(errors)[0];
        toastr.error(errors[firstErrorKey])
        return false;
      }
      toastr.error(error.response.data)
    });
  });






  // place workers
  var placeWorkersTable = $('#placeWorkersTable');

  if (placeWorkersTable) {
    var placeWorkersDataTable = placeWorkersTable.DataTable({
      searching: true,
      info: false,
      language: {
        paginate: {
          first: "Первый",
          last: "Прошлой",
          next: "Вперёд",
          previous: "Назад"
        }
      }
    });
  }

  $('#placeWorkersTableSearch').on('keyup', function () {
    placeWorkersDataTable.search(this.value).draw();
  });

  $('#placeWorkerImageUpload').on('change', function () {
    readImageURL(this, 'placeWorkerNewImage');
    $('#placeWorkerNewImageLabel').removeClass('d-none')
    $('#placeWorkerNewImageLabel').siblings('label').first().addClass('d-none')
  });

  var createPlaceWorkerForm = document.getElementById("createPlaceWorkerForm");
  createPlaceWorkerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(createPlaceWorkerForm);
    formData.append('active', ($("#isActiveWorker").prop('checked') ? 1 : 0))
    formData.append('orders_see_all', ($("#placeWorkerSeeAllOrders").prop('checked') ? 1 : 0))

    var placeWorkerID = document.getElementById("placeWorkerID").value;
    axios.post('/admin/worker', formData)
      .then(response => {
        toastr.success(response.data.message);
        var data = response.data.worker

        $("[data-dismiss=modal]").trigger({type: "click"});

        placeWorkersDataTable.row.add([
          data.id,
          data.name,
          data.email,
          moment(data.created_at).format('MM-D-yyyy'),
          (data.worker_shift ? `${data.worker_shift.name} (${data.worker_shift.from} - ${data.worker_shift.until})` : ""),
          data.phone,
          template('placeTableButtons', {id: data.id}),
        ]).draw(false).node();

        createPlaceWorkerForm.reset()
      }).catch((error) => {
      let errors = error.response.data.errors;
      if (typeof errors === 'object' && errors !== null) {
        let firstErrorKey = Object.keys(errors)[0];
        toastr.error(errors[firstErrorKey])
        return false;
      }
      toastr.error(error.response.data)
    });
  });

  $(document).on('click', '.delete-place-worker', function (e) {
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
        axios.delete('/admin/worker/' + table_id,)
          .then(response => {
            toastr.success(response.data.message);
            placeWorkersDataTable.row($(this).parents('tr') )
              .remove()
              .draw()

          }).catch((error) => {
          let errors = error.response.data;
          if (typeof errors === 'object' && errors !== null) {
            let firstErrorKey = Object.keys(errors)[0];
            toastr.error(errors[firstErrorKey])
            return false;
          }
          toastr.error(error.response.data)
        });
      }
    })

  })


  $(document).on('click', '.edit-place-worker', function (e) {
    e.preventDefault();
    var worker_id = $(this).data('id');
    editedIndex = $(this).parents('tr').data('index');

    axios.get('/admin/worker/' + worker_id,).then(response => {

      let data = response.data.worker;
      var createPlaceWorkerForm = $("#createPlaceWorkerForm");

      createPlaceWorkerForm.find("[name='worker_id']").val(data.id);
      createPlaceWorkerForm.find("[name='name_full']").val(data.name_full);
      createPlaceWorkerForm.find("[name='name']").val(data.name);
      createPlaceWorkerForm.find("[name='name']").val(data.name);
      createPlaceWorkerForm.find("[name='phone']").val(data.phone);
      createPlaceWorkerForm.find("[name='card_number']").val(data.params.card_number);
      createPlaceWorkerForm.find("[name='email']").val(data.email);

      if (data.image) {
        let placeWorkerNewImageLabel = $('#placeWorkerNewImageLabel');
        placeWorkerNewImageLabel.removeClass('d-none')
        placeWorkerNewImageLabel.siblings('label').first().addClass('d-none')
        placeWorkerNewImageLabel.find('img').attr('src', '/storage/' + data.image)
      }

      let workers = [];
    }).catch((error) => {
      console.log(error);
      let errors = error.response.data;
      if (typeof errors === 'object' && errors !== null) {
        let firstErrorKey = Object.keys(errors)[0];
        toastr.error(errors[firstErrorKey])
        return false;
      }
      toastr.error(error.response.data)
    });
  });



  // helper
  function template(templateId, data) {
    return document.getElementById(templateId).innerHTML
      .replace(
        /%(\w*)%/g, // or /{(\w*)}/g for "{this} instead of %this%"
        function (m, key) {
          return data.hasOwnProperty(key) ? data[key] : "";
        }
      );
  }

  function readImageURL(input, image) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#' + image).attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
});
