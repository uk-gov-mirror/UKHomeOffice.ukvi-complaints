'use strict';

module.exports = {
  tableSections: [{
    name: 'personal-contact-details',
    fields: [
      'applicant',
      'accept-declaration',
      'applicant-name',
      'representative-name',
      'dob',
      'email-address',
      'phone-number'
    ]
  }, {
    name: 'complaint-details',
    fields: [
      'complaint-type',
      'where',
      'complaint-phone-number',
      'country',
      'city',
      'complaint-date',
      'complaint-time',
      'phoned-from',
      'has-complaint-reference',
      'complaint-reference',
      'has-reference',
      'reference-numbers',
      'gwf-reference',
      'ho-reference',
      'ihs-reference',
      'complaint-details'
    ]
  }]
};