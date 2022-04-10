const searchHelper = (searchKey, query, req) => {
  if (req.query.search) {
    const searchObject = {};
    //title serachValue
    const regex = new RegExp(req.query.search, "i");
    searchObject[searchKey] = regex;
    return (query = query.where(searchObject));
  }
  return query;
};

const populateHelper = (query, population) => {
  return query.populate(population);
};

const questionSortHelper = (query, req) => {
  const sortKey = req.query.sortBy;

  if (sortKey === "most-answered") {
    return (query = query.sort("-answerCount")); //Büyükten küçüğe
  }
  if (sortKey === "most-liked") {
    return (query = query.sort("-likeCount"));
  }
  return (query = query.sort("-createdAt"));
  
};

const paginationHelper = async (totalDocuments, query, req) => {
  // Pagination

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = totalDocuments;
  const pageCount=Math.ceil( total/limit );
  const pagination = {pageCount};

  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  
  return {
    query:
      query === undefined ? undefined : query.skip(startIndex).limit(limit),
    pagination: pagination,
    startIndex,
    limit,
  };

  //page=2, limit=5 => startIndex 5, endIndex 10
  // 1 2 3 4 5 6 7 8 9 10
  // skip(2) => 3 'ten itibaren gösterir.
  // limit(2) => bir sayfada gösterilcek soru sayısı
};
module.exports = {
  searchHelper,
  populateHelper,
  questionSortHelper,
  paginationHelper,
};
