$('button').on('click', function () {
  $image = $(this).parent('div').find('img').attr('src');
  $title = $(this).parent('div').parent('div').find('h2').text();
  $p = $(this).parent('div').parent('div').find('p').text();
  const article = {
    title: $title,
    image: $image,
    p: $p,
  };
  $.ajax('/saved', {
    type: 'POST',
    data: article
  }).then(function(){
    alert("Article Saved")
  })
});
