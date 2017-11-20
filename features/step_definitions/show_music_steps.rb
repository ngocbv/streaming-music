Given(/^I have (\d+) songs$/) do |number|
  @songs = create_list(:song, number.to_i)
end

When(/^I visit list musics$/) do
  visit '/musics'
end

Then(/^I saw (\d+) songs$/) do |number|
  expect(page).to have_selector('table tbody tr', count: number.to_i)
end
 
