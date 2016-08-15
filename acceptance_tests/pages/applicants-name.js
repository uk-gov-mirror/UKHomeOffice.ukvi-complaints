'use strict';

const translations = require('../../apps/complaints/translations/en/default');
const labels = translations.fields['applicants-name'].label;

module.exports = {
  url: '/applicants-name',
  'applicants-name': '#applicants-name',
  applicantLabel: labels.default,
  representativeLabel: labels.applicant.false,
  value: 'Sterling Archer'
};
