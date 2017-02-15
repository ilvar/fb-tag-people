$tl_cover_container = document.getElementById('fb-timeline-cover-name');

username = window.location.pathname.substr(1);

if ($tl_cover_container) {
  $input = document.createElement('input');
  $input.id = "tag-people-note";
  $input.placeholder = "This note is visible only to you";
  $input.style.width = "100%";

  $tl_cover_container.parentNode.parentNode.appendChild($input);
  document.getElementById('tag-people-note').value = localStorage['tagsForPeople_' + username] || "";
}

document.getElementById("tag-people-note").addEventListener("change", function( event ) {
  localStorage['tagsForPeople_' + username] = this.value;
}, false);

function updateLinks() {
  links = document.getElementsByTagName('a');
  for (i = 0; i < links.length; i++) {
    link = links[i];
    if (link.classList.contains('tag-people')) {
      continue;
    }
    if (!link.attributes['data-hovercard']) {
      continue;
    }

    bits = link.href.replace('www.', '').replace('https://facebook.com/', '').split('?');
    luser = bits[0];
    note = localStorage['tagsForPeople_' + luser]
    if (note) {
      link.title = note;
    }
    link.classList.add('tag-people');
  }
}

setInterval(updateLinks, 1000);
updateLinks();
