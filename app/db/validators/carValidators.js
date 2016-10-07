var constraints = {};
// ID, Name, Trim, HorsePower, CompanyID
constraints.newCarConst = {
  Name: {
    presence: true
  },
  Trim: {
    presence: true
  },
  HorsePower: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  },
  CompanyID: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  }
};

// ID, Name, Trim, HorsePower, CompanyID
constraints.updatedCarConst = {
  HorsePower: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  },
  CompanyID: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  }
};

// ID, Name, Trim, HorsePower, CompanyID
constraints.deleteCarConst = {
  ID: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  }
};

module.exports = constraints;
