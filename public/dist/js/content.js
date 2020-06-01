$(function () {
  
    $("#example1").DataTable();
    $("#users").DataTable({
      
    });
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "retrieve": true,
    });
  });