'use strict';

const controllers = require('hof').controllers;

module.exports = {
  name: 'complaints',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/who'
    },
    '/who': {
      fields: [
        'applicant',
        'accept-declaration'
      ],
      next: '/applicant-name',
      forks: [{
        target: '/representative-name',
        condition: {
          field: 'applicant',
          value: 'false'
        }
      }],
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/applicant-name': {
      fields: ['applicant-name'],
      next: '/applicant-dob',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/representative-name': {
      fields: ['representative-name'],
      next: '/contact-details',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/applicant-dob': {
      next: '/contact-details',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/contact-details': {
      next: '/complaint-type',
      locals: {
        section: 'personal-contact-details'
      }
    },
    '/complaint-type': {
    }
  }
};
