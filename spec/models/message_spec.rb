require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    #メッセージを保存できる場合↓
    context 'can save' do   # この中にメッセージを保存できる場合のテストを記述
      # メッセージがあれば保存できる
      it 'is valid with content' do # contentカラムの値ありでcreateされることを確かめる
        expect(build(:message, image: nil)).to be_valid # messageクラスのインスタンス(image: nilの状態で) がbe_validになればクリア
      end
      # 画像があれば保存できる
      it 'is valid with image' do # imageカラムの値があればcreateされることを確かめる
        expect(build(:message, content: nil)).to be_valid # messageクラスのインスタンス(content: nilの状態で) がbe_validになればクリア
      end
      # メッセージと画像があれば保存できる
      it 'is valid with content and image' do # contentとimageカラムの値がどっちもありでcreateされることを確かめる
        expect(build(:message)).to be_valid # messageクラスのインスタンスがbe_validになればクリア
      end
    end

    # メッセージを保存できない場合
    context 'can not save' do   # この中にメッセージを保存できない場合のテストを記述
      # メッセージも画像も無いと保存できない
      it 'is invalid without content and image' do # contentとimageカラムの値なしでcreateされないってっことを確かめる
        message = build(:message, content: nil, image: nil) # contentとimageカラムの値なしのmessageクラスのインスタンスを生成し変数messageに代入
        message.valid? #messageがバリデーションにより保存できるか？
        expect(message.errors[:content]).to include('を入力してください') #contentカラムが原因のエラー文に'を入力してください'が含まれていればテスト成功
      end
      # group_idが無いと保存できない
      it 'is invalid without group_id' do # group_idカラムの値なしで追加されないっていうことを確かめる
        message = build(:message, group_id: nil) # group_idカラムの値がなしのmessageクラスのインスタンスを生成し変数messageに代入
        message.valid? #messageがバリデーションにより保存できるか？
        expect(message.errors[:group]).to include('を入力してください') # groupカラムが原因のエラー文に'を入力してください'が含まれていればテスト成功
      end
      # user_idが無いと保存できない
      it 'is invalid without user_id' do # user_idカラムの値なしではcreateされないことを確かめる
        message = build(:message, user_id: nil) # user_idカラムの値なしでmessageクラスのインスタンスを生成して変数messageに入れる
        message.valid? # messageがバリデーションにより保存されるか？
        expect(message.errors[:user]).to include('を入力してください') # user_idカラムが原因のエラー文に'を入力してください'が含まれていればテスト成功
      end
    end
  end
end
