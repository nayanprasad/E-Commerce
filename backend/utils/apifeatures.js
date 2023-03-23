class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword 
    ? {
      name: {
        $regex: this.querystr.keyword,
        $options: "i"
      },
    } 
    : {}
    // console.log(keyword);  // { name: { '$regex': keyword, '$options': 'i' } }

    this.query = this.query.find({...keyword});
    return this;
  }

  filter() {
    // const queryCopy = this.querystr  // this will assing a refference to queryCopy, so any change in the queryCopy will effect in queryStr, to solve this
    const queryCopy = {...this.querystr};  // queryStr will have all the query parameter

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}


module.exports = ApiFeatures;