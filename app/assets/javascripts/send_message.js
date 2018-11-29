$(function() {
  function buildHTML(message) {
    var $image = message.image ? `<image src="${message.image}" class="lower-message__image" alt="image" width="300" height="300">` : ``
    var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      ${$image}
                    </div>
                  </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $('.hidden').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500);
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.form__submit').prop("disabled", false);
    })
  })
});
