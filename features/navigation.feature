Feature: Navigation tests


@smoke
Scenario: Form page navigation
Given Launch browser and verify the contents of HOME page
When I click to "Form" page
Then I should see "Form" page