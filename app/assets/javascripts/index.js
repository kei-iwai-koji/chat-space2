$(function() {
  var userSearchResult = $('#user-search-result');

  function appendUser(user) {
    console.log('333');
    console.log(user);
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    userSearchResult.append(html);
  }

  function appendNoUser(nouser) {
    console.log('555');
    var html = `<div class="chat-group-user clearfix">${ nouser }</div>`
    userSearchResult.append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    console.log('111');
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      console.log('222');
      if (users.length !== 0) {
        console.log(users);
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        console.log('444');
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
