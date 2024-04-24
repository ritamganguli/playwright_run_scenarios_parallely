Feature: DuckDuckGo Search

  Scenario: Search results should match for Chrome
    Given Open DuckDuckGo Website for Chrome
    When Search for LambdaTest for Chrome
    Then Title should match for Chrome

  Scenario: Search results should match for pw-webkit
    Given Open DuckDuckGo Website for pw-webkit
    When Search for LambdaTest for pw-webkit
    Then Title should match for pw-webkit
