$('.save').on('click', function () {
  $image = $(this).parent('div').find('img').attr('src');
  $title = $(this).parent('div').parent('div').find('h2').text();
  $p = $(this).parent('div').parent('div').find('h5').text();
  $a = $(this).parent('div').parent('div').find('a').attr('href');
  $by = $(this).parent('div').parent('div').find('small').text();
  const article = {
    title: $title,
    img: $image,
    p: $p,
    a: $a,
    by: $by
  };
  $.ajax('/saved', {
    type: 'POST',
    data: article,
  }).then(function () {
    alert('Article Saved');
  });
});

$('.delete').on('click', function () {
  const id = $(this).parent('div')[0].id;
  $.ajax('/saved/' + id, {
    type: 'DELETE',
  }).then(function () {
    alert('article deleted');
    location.reload();
  });
});

