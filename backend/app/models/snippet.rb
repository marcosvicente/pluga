class Snippet < ApplicationRecord
  validates text, summary, presence: true

end
