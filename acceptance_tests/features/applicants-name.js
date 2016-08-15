'use strict';

Feature('Applicants Name');

Before((
  I,
  whoPage,
  applicantsNamePage
) => {
  I.visitPage(applicantsNamePage, null, [
    whoPage
  ]);
});

Scenario('The correct field is on the page', (
  I,
  applicantsNamePage
) => {
  I.seeElements([
    applicantsNamePage['applicants-name']
  ]);
});
