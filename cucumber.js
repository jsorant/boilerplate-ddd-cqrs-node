const common = {
  format: ["progress"],
  requireModule: ["ts-node/register"],
  require: ["tests/StepsDefinitions/*.ts"],
  publishQuiet: true,
};

module.exports = {
  default: {
    ...common,
  },
  inmemory: {
    ...common,
    worldParameters: {
      persistenceType: "inmemory",
    },
  },
  sqlite3: {
    ...common,
    worldParameters: {
      persistenceType: "sqlite3",
    },
  },
};
