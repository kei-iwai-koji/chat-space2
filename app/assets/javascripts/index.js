$(function() {
  var userSearchResult = $('#user-search-result');
  var preWord;

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

  // function element(element) {
  //   return element;
  // }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    // var inputs = input.split(" ").filter(function(e) { return e; });
    // var newInputs = inputs.map(element);
    // var word = newInputs.join(" ");

    // if (word != preWord) {
      $(".chat-group-user").remove();
        if(input.length !== 0) {

          // $.each(newInputs, function(i, p) {
          //   if (i == 0 || i == 1) {
          //     var
          //     console.log(i);
          //   } else {
          //     return false;
          //   }
          //   console.log('&&');
          // });
          //   console.log(newInputs);
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
              console.log('444');
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
});
