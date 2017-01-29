$(function() {
  $tl_cover_container = $('#fb-timeline-cover-name');

  username = window.location.pathname.substr(1);

  if ($tl_cover_container.length) {
    $input = $('<input id="tag-people-note" placeholder="This note is visible only to you" style="width: 100%" />');
    $tl_cover_container.parent().before($input);
    $('#tag-people-note').val(localStorage['tagsForPeople_' + username] || "");
  }

  $(document).on('change', '#tag-people-note', function() {
    localStorage['tagsForPeople_' + username] = this.value;
  });

  function updateLinks() {
    links = $('a[data-hovercard]:not(.tag-people)');
    _.each(links, function(l) {
      bits = l.href.replace('www.', '').replace('https://facebook.com/', '').split('?')
      luser = bits[0];
      note = localStorage['tagsForPeople_' + luser]
      if (note) {
        l.title = note;
      }
    });
    links.addClass('tag-people');
  }

  setInterval(updateLinks, 1000);
});