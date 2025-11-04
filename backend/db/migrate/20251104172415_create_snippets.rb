class CreateSnippets < ActiveRecord::Migration[8.0]
  def change
    create_table :snippets do |t|
      t.text :text
      t.string :summary

      t.timestamps
    end
  end
end
