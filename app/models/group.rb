class Group < ApplicationRecord
  validates_presence_of :name, allow_blank: false
  has_many :memberships
  has_many :users, through: :memberships
end