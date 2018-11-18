# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, primary_key: true|
|name|string|null: false, unique: true|
|e_mail|string|null: false, unique: true|

### Association
- has_many :groups, through: :members
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, primary_key: true|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :messages


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, primary_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, primary_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|null: false|
|image|text| |

### Association
- belongs_to :group
- belongs_to :user
