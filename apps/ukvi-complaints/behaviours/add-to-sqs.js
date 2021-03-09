/* eslint-disable default-case */
'use strict';
const Validator = require('jsonschema').Validator;
const { Producer } = require('sqs-producer');
const decsSchema = require('../schema/decs.json');
const SubmittingApplicationComplaint = require('../lib/submitting-application');
const MakingAppointmentComplaint = require('../lib/making-appointment');
const DelaysComplaint = require('../lib/delays');

module.exports = config => {

  return superclass => class SQSIntegration extends superclass {


    // process - call formatData

    // validate - check data against schema

    // saveValue - send to SQS queue


    formatData(values) {
      switch (values.reason) {
        case 'immigration-application':
          const submittingApplication = new SubmittingApplicationComplaint(values);
          return submittingApplication.formatValues();
        case 'immigration-appointment':
          const makingApplication = new MakingAppointmentComplaint(values);
          return makingApplication.formatValues();
        case 'delays':
          const delays = new DelaysComplaint(values);
          return delays.formatValues();
        default:
          return {
            test: 'test'
          };
      }
    }

    saveValues(req, res, next) {

        console.log(req.sessionModel.toJSON());

        const complaintData = this.formatData(req.sessionModel.toJSON());

        console.log(complaintData);
        console.log('>>>>>>>>>>>>');
        console.log(complaintData.complaint.reporterDetails);

        const validator = new Validator();
        const valid = validator.validate(complaintData, decsSchema);

        console.log(valid.errors);

        const producer = Producer.create({
          queueUrl: config.aws.sqsUrl,
          region: config.aws.region,
          // accessKeyId: 'yourAccessKey',
          // secretAccessKey: 'yourSecret'
        });

        // producer.send([
        //   complaintData
        // ]).then(resp => {
        //   console.log(resp);
        // });

        return next();

    }


  };
};
