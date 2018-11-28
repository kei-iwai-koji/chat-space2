require 'rails_helper'

describe MessagesController do #メッセージコントローラーをテストする
  let(:group) { create(:group) } #この後やるテストでこれらの値をつかうのでletで先に値を出しとく
  let(:user) { create(:user) } # 同上

  describe '#index' do #indexメソッドを対象にテスト
    # ログインしている時
    context 'log in' do
      before do # 各example前にログインしたという状況を作るためbeforeで定義
        login user # controller_macros.rbで定義しているメソッドを使ってログイン
        get :index, params: { group_id: group.id } # message#indexのビューに行くけれども、ルーティングでネストしているためgroup_idが必要
      end

      it 'assigns @message' do # @messageのインスタンス変数がちゃんと定義されているかを確かめる
        expect(assigns(:message)).to be_a_new(Message) # @message(Message.newで定義された新しいMessageクラスのインスタンス)がMessageクラスの未保存インスタンスであればテストクリア
      end

      it 'assigns @group' do # @groupのインスタンス変数がちゃんと定義されているかを確かめる
        expect(assigns(:group)).to eq group # @groupがletで定義したgroupと同じであればクリア
      end

      it 'redners index' do # indexのビューにちゃんと飛ぶか確かめる
        expect(response).to render_template :index # リクエストのビュー(response)がindexアクションのビューであればクリア
      end
    end

    # ログインしてない時のテスト
    context 'not log in' do
      before do # example前にログインせずログイン後のビューに飛んだという状況を作る
        get :index, params: { group_id: group.id } # message#indexのビューに行くけれども、ルーティングでネストしているためgroup_idが必要
      end

      it 'redirects to new_user_session_path' do # new_user_session_path(ログインしてください画面)にリダイレクトするかテスト
        expect(response).to redirect_to(new_user_session_path) # responseがnew_user_session_pathならクリア！
      end
    end
  end

  describe '#create' do # createを対象にテストをする
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } } #createアクションを起こすための引数として使うためparamsを作成

    # ログインしている場合
    context 'log in' do
      before do
        login user
      end
      # ログインしているかつ、保存に成功した場合という条件で
      context 'can save' do
        subject {   # expectの引数にするため
          post :create,
          params: params
        } # [postメソッドでcreateアクションを擬似的にリクエストをした結果]と言う意味

        it 'count up message' do #メッセージの数を数えるテスト
          expect{ subject }.to change(Message, :count).by(1) # subjectの結果がMessageモデルのレコードの総数が1個増えた状態になればクリア
        end

        it 'redirects to group_messages_path' do # group_messages_path(チャット画面index)にリダイレクトするかのテスト
          subject # postメソッドでcreateアクションを擬似的にリクエストをした結果
          expect(response).to redirect_to(group_messages_path(group)) # createアクションを起こした結果がgroup_messages_path(引数はグループid)になればクリア
        end
      end
      # ログインしているが、保存に失敗した場合
      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
        # group_idカラム、user_idカラム、フォームから送られるmessage(content: nilかつimage: nil)が保存されてないparamsを作成(意図的にメッセージの保存に失敗)

        subject {   # expectの引数にするため
          post :create,
          params: invalid_params
        } # 保存できてないparamsでcreateアクションを動かす

        it 'does not count up' do # カウント総数が増えないかのテスト
          expect { subject }.not_to change(Message, :count) # 意図的にメッセージの保存に失敗した状態でcreateアクションを動かした結果が、Messageモデルのインスタンス総数が変化なしの状態になればクリア
        end

        it 'renders index' do # メッセージの保存に失敗した場合、indexアクションのビューに行くかのテスト
          subject # 意図的にメッセージの保存に失敗した状態でcreateアクションを動かしますー
          expect(response).to render_template :index # そのresponseがindexにrenderされた状態になればクリア
        end
      end
    end

    # ログインしていない場合
    context 'not log in' do

      it 'redirects to new_user_session_path' do # new_user_session_path(ログインしてください画面)にリダイレクトするかテスト
        post :create, params: params # ログインしてない状態でcreateする
        expect(response).to redirect_to(new_user_session_path) # そのresponseがnew_user_session_pathにリダイレクトされればクリア
      end
    end
  end
end


