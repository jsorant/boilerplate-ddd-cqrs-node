Feature: Track a city

    In order to follow the meteo in multiple cities
    As an application user
    I should be able to add a city to a watchlist

    @critical
    Scenario: I can add a city
        Given a city
        And a watchlist
        When I add the city to the watchlist
        Then I should be able to obtain the meteo of this city

    Scenario: I can't add a city twice
        Given a city
        And a watchlist
        And I have added the city to the watchlist
        When I try to add this city to the watchlist again
        Then I should be informed that this city is already tracked

    Scenario: A city can belong to multiple watchlists
        Given a city
        And a watchlist
        And another watchlist
        And the city have been added to the other watchlist
        When I add the city to the watchlist
        Then I should be able to obtain the meteo of this city
    