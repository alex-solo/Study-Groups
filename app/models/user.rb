class User < ApplicationRecord
  validates_presence_of :name, allow_blank: false
  has_many :memberships
  has_many :groups, through: :memberships, dependent: :destroy
end