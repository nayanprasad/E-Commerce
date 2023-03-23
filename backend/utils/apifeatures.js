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


}


module.exports = ApiFeatures;