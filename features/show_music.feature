Feature: Showing music
  As a user
  I want to have a list of musics
  So that I can see the musics that I can listen

  Scenario: Show music
    Given I have 4 songs
    When I visit list musics
    Then I saw 4 songs
