class Snippet < ApplicationRecord
  validates_presence_of :text
  validates_presence_of :summary
end
