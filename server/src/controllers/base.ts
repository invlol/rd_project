exports.buildSuccObject = msg => {
  return {
    msg
  }
};

exports.buildErrObject = (code, message) => {
  return {
    code,
    message
  }
};

exports.handleError = (res, err) => {
  // Prints error in console
  if (process.env.ENV === 'dev') {
    console.log(err)
  }
  // Sends error to user
  res.status(err.code).json({
    errors: {
      msg: err.message
    }
  })
};

exports.checkQueryString = async query => {
  return new Promise((resolve, reject) => {
    try {
      return typeof query !== 'undefined' ?
        resolve(JSON.parse(query)) :
        resolve({});
    } catch (err) {
      console.log(err.message);
      return reject(
        this.buildErrObject(422, 'BAD_FORMAT_FOR_FILTER_USE_JSON_FORMAT')
      );
    }
  })
};

exports.isIDGood = async id => {
  return new Promise((resolve, reject) => {
    const goodID = String(id).match(/^[0-9a-fA-F]{24}$/);
    return goodID ?
      resolve(id) :
      reject(this.buildErrObject(422, 'ID_MALFORMED'))
  })
};
