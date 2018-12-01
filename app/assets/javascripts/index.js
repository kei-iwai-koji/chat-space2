$(function() {
  var userSearchResult = $('#user-search-result');
  var chatGroupUsers = $('#chat-group-users');
  // var preWord;

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    userSearchResult.append(html);
  }

  function appendNoUser(nouser) {
    var html = `<div class="chat-group-user clearfix">${ nouser }</div>`
    userSearchResult.append(html);
  }

  function addUser(userId, userName) {
    var html = `<div id="chat-group-user-22" class="chat-group-user clearfix">
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class="chat-group-user__name">${userName}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${userId}" data-user-name="${userName}">削除</a>
                </div>`
    chatGroupUsers.append(html);
  }

  // function element(element) {
  //   return element;
  // }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    // var inputs = input.split(" ").filter(function(e) { return e; });
    // var newInputs = inputs.map(element);
    // var word = newInputs.join(" ");

    // if (word != preWord) {
      $(userSearchResult).empty();
        if(input.length !== 0) {

          // $.each(newInputs, function(i, p) {
          //   if (i == 0 || i == 1) {
          //     var
          //   } else {
          //     return false;
          //   }
          // });
          // $.ajax({
          //   type: 'GET',
          //   url: '/users',
          //   data: { keyword1: p0,
          //           keyword2: p1},
          //   dataType: 'json'
          // })

          $.ajax({
            type: 'GET',
            url: '/users',
            data: { keyword: input},
            dataType: 'json'
          })

          .done(function(users) {
            if (users.length !== 0) {
              users.forEach(function(user){
                  appendUser(user);
              });
            } else {
              appendNoUser("一致するユーザーはいません");
            }
          })
          .fail(function() {
            alert('ユーザー検索に失敗しました');
          })
        }
    // }
    // preWord = word;
  });

  $(document).on("click", ".user-search-add", function() {
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");
    $(this).parent().remove();
    addUser(userId, userName);
  });

  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});
