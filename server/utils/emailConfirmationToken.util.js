/* external import */
const nodemailer = require("nodemailer");

/* internal import */
const console = require("./console.util");

const emailConfirmationToken = (userEmail, token, protocol, host, slug) => {
  const transporter = nodemailer.createTransport({
    service: process.env.APP_SERVICE,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.APP_EMAIL,
    to: userEmail,
    subject: `Validation code to confirm ${
      (slug === "sign-up" && "Signing up") ||
      (slug === "reset-password" && "Forgot password")
    }`,
    // text: `Thank you for ${
    //   (slug === "sign-up" && "Signing up") ||
    //   (slug === "reset-password" && "Forgot password")
    // }.`,
    // html: `Please, confirm by clicking here: ${protocol}://${host}/user/${slug}?token=${token}`,
    html: `<div style="width: 50%; margin: 0 auto;"> <tr>
    <td
      style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
        font-size: 14px;
        vertical-align: top;
        box-sizing: border-box;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        style="border-collapse: separate; width: 100%"
      >
        <tbody>
          <tr>
            <td
              style="
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                  Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                  'Segoe UI Emoji', 'Segoe UI Symbol';
                font-size: 14px;
                vertical-align: top;
              "
            >
              <p
                style="
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                    'Segoe UI Emoji', 'Segoe UI Symbol';
                  font-size: 20px;
                  color: rgb(21, 33, 42);
                  font-weight: bold;
                  line-height: 25px;
                  margin: 0px 0px 15px;
                  --darkreader-inline-color: #d4d0cb;
                "
                data-darkreader-inline-color=""
              >
                Hey there!
              </p>
              <p
                style="
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                    'Segoe UI Emoji', 'Segoe UI Symbol';
                  font-size: 16px;
                  color: rgb(58, 70, 76);
                  font-weight: normal;
                  line-height: 25px;
                  margin: 0px 0px 32px;
                  --darkreader-inline-color: #beb8b0;
                "
                data-darkreader-inline-color=""
              >
                Tap the link below to complete the ${
                    (slug === "sign-up" && "Signing up") ||
                    (slug === "reset-password" && "Forgot password")
                  } process for Nurui, and
                be automatically signed in:
              </p>
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="
                  border-collapse: separate;
                  width: 100%;
                  box-sizing: border-box;
                "
              >
                <tbody>
                  <tr>
                    <td
                      align="left"
                      style="
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          Roboto, Helvetica, Arial, sans-serif,
                          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                        font-size: 16px;
                        vertical-align: top;
                        padding-bottom: 35px;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style="border-collapse: separate; width: auto"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                  'Apple Color Emoji', 'Segoe UI Emoji',
                                  'Segoe UI Symbol';
                                font-size: 16px;
                                vertical-align: top;
                                background-color: rgb(40, 33, 252);
                                border-radius: 5px;
                                text-align: center;
                                --darkreader-inline-bgcolor: #0802b8;
                              "
                              data-darkreader-inline-bgcolor=""
                            >
                              <a
                                href=${protocol}://${host}/user/${slug}?token=${token}
                                style="
                                  display: inline-block;
                                  color: rgb(255, 255, 255);
                                  background-color: rgb(40, 33, 252);
                                  border: 1px solid rgb(40, 33, 252);
                                  border-radius: 5px;
                                  box-sizing: border-box;
                                  text-decoration: none;
                                  font-size: 16px;
                                  font-weight: normal;
                                  margin: 0px;
                                  padding: 9px 22px 10px;
                                  --darkreader-inline-color: #e8e6e3;
                                  --darkreader-inline-bgcolor: #0802b8;
                                  --darkreader-inline-border-top: #0802a7;
                                  --darkreader-inline-border-right: #0802a7;
                                  --darkreader-inline-border-bottom: #0802a7;
                                  --darkreader-inline-border-left: #0802a7;
                                "
                                target="_blank"
                                data-saferedirecturl=${protocol}://${host}/user/${slug}?token=${token}
                                data-darkreader-inline-color=""
                                data-darkreader-inline-bgcolor=""
                                data-darkreader-inline-border-top=""
                                data-darkreader-inline-border-right=""
                                data-darkreader-inline-border-bottom=""
                                data-darkreader-inline-border-left=""
                                >Confirm verification</a
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style="
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                    'Segoe UI Emoji', 'Segoe UI Symbol';
                  font-size: 16px;
                  color: rgb(58, 70, 76);
                  font-weight: normal;
                  line-height: 25px;
                  margin: 0px 0px 25px;
                  --darkreader-inline-color: #beb8b0;
                "
                data-darkreader-inline-color=""
              >
                For your security, the link will expire in 24 hours time.
              </p>
              <p
                style="
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                    'Segoe UI Emoji', 'Segoe UI Symbol';
                  font-size: 16px;
                  color: rgb(58, 70, 76);
                  font-weight: normal;
                  line-height: 25px;
                  margin: 0px 0px 30px;
                  --darkreader-inline-color: #beb8b0;
                "
                data-darkreader-inline-color=""
              >
                See you soon!
              </p>
              <hr />
              <p
                style="
                  word-break: break-all;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                    'Segoe UI Emoji', 'Segoe UI Symbol';
                  font-size: 15px;
                  color: rgb(58, 70, 76);
                  font-weight: normal;
                  line-height: 25px;
                  margin: 0px 0px 5px;
                  --darkreader-inline-color: #beb8b0;
                "
                data-darkreader-inline-color=""
              >
                You can also copy &amp; paste this URL into your browser:
              </p>
              <p
                style="
                  word-break: break-all;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                    'Segoe UI Emoji', 'Segoe UI Symbol';
                  font-size: 15px;
                  line-height: 25px;
                  margin-top: 0px;
                  color: rgb(58, 70, 76);
                  --darkreader-inline-color: #beb8b0;
                "
                data-darkreader-inline-color=""
              >
                <a
                  href=${protocol}://${host}/user/${slug}?token=${token}
                  target="_blank"
                  data-saferedirecturl=${protocol}://${host}/user/${slug}?token=${token}
                  >${protocol}://${host}/user/${slug}?token=${token}</a
                >
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
  </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.errorMessage(error.name);
    } else {
      console.successMessage(`Email sent to: ${info.envelope.to[0]}`);
    }
  });
};

module.exports = emailConfirmationToken;
