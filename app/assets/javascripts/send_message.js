$(function() {
  function buildHTML(message) {
    var htmlUpper = `<div class="message">
                        <div class="upper-message">
                          <div class="upper-message__user-name">
                            ${message.user_name}
                          </div>
                          <div class="upper-message__date">
                            ${message.date}
                          </div>
                        </div>`
    if (message.image && message.content) {
      var htmlLower =  `<div class="lower-meesage">
                          <p class="lower-message__content">
                            ${message.content}
                          </p>
                          <image src="${message.image}" class="lower-message__image" alt="image" width="300" height="300">
                        </div>
                      </div>`
    } else if (message.content) {
      var htmlLower =  `<div class="lower-meesage">
                          <p class="lower-message__content">
                            ${message.content}
                          </p>
                        </div>
                      </div>`
    } else {
      var htmlLower =  `<div class="lower-meesage">
                          <image src="${message.image}" class="lower-message__image" alt="image" width="300" height="300">
                        </div>
                      </div>`
    }
    return htmlUpper + htmlLower;
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500);
    })
    .fail(function() {
      alert('error');
    })
  })
});
