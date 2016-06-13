const mailgunKey = process.env.MAILGUNKEY;
const mailgunDomain = process.env.MAILGUNDOMAIN;
const sendfrom = process.env.SENDFROM;
const sendto = process.env.SENDTO;

import mailgunFactory from 'mailgun-js';
const mailgun = mailgunFactory({ apiKey: mailgunKey, domain: mailgunDomain });

export const paperMailer = async (location) => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      const body = `The dispenser in ${location} is running low on paper.`;
      resolve(body);
    } else {
      const msg = {
        from: sendfrom,
        to: sendto,
        subject: `Low Paper in Dispenser ${location}`,
        text: `The dispenser in ${location} is running low on paper.`,
      };

      mailgun.messages().send(msg, (error, body) => {
        resolve(body);
        reject(error);
      });
    }
  });
};

export const batteryMailer = async (location) => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      const body = `The dispenser in ${location} needs its batteries replaced.`;
      resolve(body);
    } else {
      const msg = {
        from: sendfrom,
        to: sendto,
        subject: `Low Batterkes in Dispenser ${location}`,
        text: `The dispenser in ${location} needs its batteries replaced.`,
      };

      mailgun.messages().send(msg, (error, body) => {
        resolve(body);
        reject(error);
      });
    }
  });
};
