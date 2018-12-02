$(function() {
  // メッセージ追加
  function buildHTML(message) {
    var $image = message.image ? `<image src="${message.image}" class="lower-message__image" alt="image" width="300" height="300">` : ``
    var html = `<div class="message" data-message_id="${message.id}">
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
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500);
  }

  //メッセージ投稿機能、非同期化
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
      buildHTML(data);
      $('form')[0].reset();
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.form__submit').prop("disabled", false);
    })
  })

// ここから自動更新機能についての記述,5秒ごと
  $(function() {
    setInterval(upDate, 5000);
  });

  // 自動更新機能
  function upDate() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data('message_id');
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          messages.forEach(function(message) {
              buildHTML(message);
          });
        }
      })
      .fail(function() {
        alert('自動更新できませんでした');
      })
    } else {
      clearInterval(upDate);
    }
  }
});
